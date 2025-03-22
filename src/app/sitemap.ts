import { MetadataRoute } from 'next';
import { getImagesCountCache } from '@/actions/image';
import { routing, getPathname } from '@/i18n/routing';
import { getAllPostsSiteMapCache } from '@/actions/post';

const host = process.env.NEXT_PUBLIC_WEBSITE_URL;

// Static pages that don't change frequently
const staticPages = [
  '/',
  '/signin',
  '/signup',
  '/password/forgot',
  '/password/reset',
  '/terms',
  '/jlpt',
  '/gallery',
  '/unauthorized',
  '/ask',
  '/user/change/password',
  '/admin',
];

// Caching current date for lastmod to avoid repetition
const currentDate = new Date().toISOString();

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [blogPages, galleryPages] = await Promise.all([
    getBlogPages(),
    getGalleryPages(),
  ]);

  // Merge all pages into a single array using concat for efficiency
  const allPages = staticPages
    .map((href) => ({
      href,
      lastmod: currentDate,
      changefreq: 'never',
      priority: 1,
    }))
    .concat(blogPages, galleryPages);

  // Return sitemap entries after processing them
  return allPages.map(getEntry);
}

async function getGalleryPages() {
  const imagesCount = await getImagesCountCache();

  // Use Array.from to generate gallery pages efficiently
  return Array.from({ length: imagesCount }, (_, i) => ({
    href: `/gallery/${i}`,
    lastmod: currentDate,
    changefreq: 'never',
    priority: 0.5,
  }));
}

async function getBlogPages() {
  const posts = await getAllPostsSiteMapCache('vi');

  return posts.map((post) => ({
    href: `/${post.post_category}/${post.slug}`,
    lastmod: post.updated_at?.toString() || post.created_at.toString(),
    changefreq: post.change_freq ?? 'monthly',
    priority: post.priority ?? 0.5,
  }));
}

function getEntry({
  href,
  lastmod,
  changefreq,
  priority,
}: {
  href: string;
  lastmod: string;
  changefreq: string;
  priority: number;
}) {
  // Cache the URLs for all locales to avoid redundant function calls
  const localesUrls = routing.locales.reduce((acc, locale) => {
    acc[locale] = getUrl(href, locale);
    return acc;
  }, {} as Record<string, string>);

  return {
    url: getUrl(href, routing.defaultLocale),
    alternates: { languages: localesUrls },
    lastModified: lastmod,
    changeFrequency: changefreq as
      | 'always'
      | 'hourly'
      | 'daily'
      | 'weekly'
      | 'monthly'
      | 'yearly'
      | 'never',
    priority,
  };
}

function getUrl(href: string, locale: string) {
  const pathname = getPathname({ locale, href });
  return `${host}${pathname}`;
}
