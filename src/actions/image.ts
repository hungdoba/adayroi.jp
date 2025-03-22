'use server';

import cloudinary from '@/libs/cloudinary';
import { CloudImage, CloudinaryResource } from '@/types/CloudImage';
import imagemin from 'imagemin';
import { unstable_cache } from 'next/cache';

// For admin create, update post
export async function deleteImage(public_id: string): Promise<boolean> {
  try {
    await cloudinary.uploader.destroy(public_id, function (result) {
      return result;
    });
    return true;
  } catch {
    return false;
  }
}

// For admin create, update post
export async function uploadImage(formData: FormData): Promise<string> {
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
            folder: folder ?? process.env.NEXT_PUBLIC_CLOUDINARY_POST_FOLDER,
            public_id: `image_${localeTimestamp}`,
            tags: ['asiatips.net app route'],
          },
          (error, result) => {
            if (error) {
              reject(error);
              return;
            }
            if (result) {
              resolve(result);
            } else {
              reject(new Error('Upload result is undefined'));
            }
          }
        )
        .end(buffer);
    }
  );
  return result.secure_url;
}

// Has cache function
async function getImagesCount(): Promise<number> {
  try {
    const results = await cloudinary.search
      .expression(
        `folder:${process.env.NEXT_PUBLIC_CLOUDINARY_GALLERY_FOLDER}/*`
      )
      .max_results(500)
      .execute();

    const totalCount = results.total_count;

    return totalCount;
  } catch (error) {
    console.log('Error fetching image count:', error);
    return 1;
  }
}

// Has cache function
async function getAllImages(): Promise<CloudImage[]> {
  try {
    const results = await cloudinary.search
      .expression(
        `folder:${process.env.NEXT_PUBLIC_CLOUDINARY_GALLERY_FOLDER}/*`
      )
      .sort_by('uploaded_at', 'desc')
      .max_results(500)
      .execute();

    const cleanResult: CloudImage[] = await Promise.all(
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

    return cleanResult;
  } catch (error) {
    console.error('Error fetching image thumbnails:', error);
    return [];
  }
}

// For gallery
async function getBlurDataUrl(
  public_id: string,
  format: string
): Promise<string> {
  const response = await fetch(
    `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/f_jpg,w_8,q_70/${public_id}.${format}`
  );
  const buffer = await response.arrayBuffer();
  const minified = await imagemin.buffer(Buffer.from(buffer));

  const url = `data:image/jpeg;base64,${Buffer.from(minified).toString(
    'base64'
  )}`;
  return url;
}

// Cache function
export const getAllImagesCache = unstable_cache(
  async () => getAllImages(),
  ['images'],
  { tags: ['images'] }
);

export const getImagesCountCache = unstable_cache(
  async () => getImagesCount(),
  ['images-count'],
  { tags: ['images'] }
);
