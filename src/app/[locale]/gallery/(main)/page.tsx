import Link from 'next/link';
import Image from 'next/image';
import { CloudImage } from '@/types/CloudImage';
import { getAllImagesCache } from '@/actions/image';
import { getTranslations } from 'next-intl/server';

export default async function page() {
  const t = await getTranslations('GalleryPage');
  const images = await getAllImagesCache();

  return (
    <div className="w-full md:max-w-5xl p-4">
      <div className="space-y-2 pb-8 md:pt-6 md:space-y-5">
        <h1 className="text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-4xl md:leading-14">
          {t('title')}
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          {t('brief')}
        </p>
      </div>
      <hr className="mb-8 border-gray-300 dark:border-slate-700" />
      <div className="divide-y divide-gray-300 dark:divide-gray-600 ">
        <div className="columns-2 gap-2 md:gap-4 md:columns-3">
          {images.map((image: CloudImage) => (
            <Link
              href={`./gallery/${image.id}`}
              key={image.id}
              className="mb-2 md:mb-4 after:content group relative block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
            >
              <Image
                alt="Photos around the world"
                className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
                placeholder="blur"
                blurDataURL={image.blur_data_url}
                src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_350/${image.public_id}.${image.format}`}
                width={350}
                height={350 / image.aspect_ratio}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
