'use server';

import cloudinary from '@/libs/cloudinary';
import { CloudImage, CloudinaryResource } from '@/types/CloudImage';
import imagemin from 'imagemin';
import { unstable_cache } from 'next/cache';

export async function deleteImage(public_id: string): Promise<boolean> {
  try {
    await cloudinary.uploader.destroy(public_id);
    return true;
  } catch (error) {
    console.error('Error deleting image:', error);
    return false;
  }
}

export async function uploadImage(formData: FormData): Promise<string> {
  try {
    const file = formData.get('image') as File;
    const folder = formData.get('folder') as string;
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    const now = new Date();
    const localeTimestamp = now.toLocaleString().replace(/[^\w]/g, '_');

    const result = await new Promise<{ secure_url: string }>(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: folder || process.env.NEXT_PUBLIC_CLOUDINARY_POST_FOLDER,
              public_id: `image_${localeTimestamp}`,
              tags: ['asiatips.net app route'],
            },
            (error, result) => {
              if (error) return reject(error);
              if (result) return resolve(result);
              reject(new Error('Upload result is undefined'));
            }
          )
          .end(buffer);
      }
    );

    return result.secure_url;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
}

async function getImagesCount(): Promise<number> {
  try {
    const results = await cloudinary.search
      .expression(
        `folder:${process.env.NEXT_PUBLIC_CLOUDINARY_GALLERY_FOLDER}/*`
      )
      .max_results(500)
      .execute();

    return results.total_count;
  } catch (error) {
    console.error('Error fetching image count:', error);
    return 0;
  }
}

async function getAllImages(): Promise<CloudImage[]> {
  try {
    const results = await cloudinary.search
      .expression(
        `folder:${process.env.NEXT_PUBLIC_CLOUDINARY_GALLERY_FOLDER}/*`
      )
      .sort_by('uploaded_at', 'desc')
      .max_results(500)
      .execute();

    return Promise.all(
      results.resources.map(
        async (result: CloudinaryResource, index: number) => ({
          id: index,
          height: result.height,
          width: result.width,
          aspect_ratio: result.aspect_ratio,
          public_id: result.public_id,
          format: result.format,
          blur_data_url: await getBlurDataUrl(result.public_id, result.format),
        })
      )
    );
  } catch (error) {
    console.error('Error fetching images:', error);
    return [];
  }
}

async function getBlurDataUrl(
  public_id: string,
  format: string
): Promise<string> {
  try {
    const response = await fetch(
      `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/f_jpg,w_8,q_70/${public_id}.${format}`
    );
    const buffer = await response.arrayBuffer();
    const minified = await imagemin.buffer(Buffer.from(buffer));

    return `data:image/jpeg;base64,${Buffer.from(minified).toString('base64')}`;
  } catch (error) {
    console.error('Error generating blur data URL:', error);
    return '';
  }
}

export const getAllImagesCache = unstable_cache(getAllImages, ['images'], {
  tags: ['images'],
});

export const getImagesCountCache = unstable_cache(
  getImagesCount,
  ['images-count'],
  { tags: ['images'] }
);
