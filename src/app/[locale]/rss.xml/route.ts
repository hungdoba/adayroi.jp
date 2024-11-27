import { getAllPostsSiteMapCache } from '@/actions/post';
import { Locale } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';
import { NextRequest, NextResponse } from 'next/server';
import RSS from 'rss';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ locale: Locale }> }
) {
  const locale = (await params).locale;
  // Fetch translations with error handling
  const t = await getTranslations({ locale: locale, namespace: 'Rss' });

  // Environment variable check
  const websiteUrl = process.env.NEXT_PUBLIC_WEBSITE_URL;
  if (!websiteUrl) {
    throw new Error('NEXT_PUBLIC_WEBSITE_URL is not defined');
  }

  const feed = new RSS({
    title: t('title'),
    description: t('description'),
    generator: 'RSS for Node and Next.js',
    feed_url: `${websiteUrl}/${locale}/rss.xml`,
    site_url: websiteUrl,
    managingEditor: `admin@${process.env.NEXT_PUBLIC_WEBSITE_FULL_NAME} (Hung Ba)`,
    webMaster: `admin@${process.env.NEXT_PUBLIC_WEBSITE_FULL_NAME} (Hung Ba)`,
    copyright: `Copyright 2024, ${process.env.NEXT_PUBLIC_WEBSITE_FULL_NAME}`,
    language: locale,
    pubDate: new Date().toUTCString(),
    ttl: 3600,
  });

  try {
    const posts = await getAllPostsSiteMapCache(locale);
    posts.forEach((post) => {
      feed.item({
        title: post.post_title,
        description: post.post_brief,
        url: `${websiteUrl}/${locale}/blog/${post.slug}`,
        categories: post.tags,
        author: 'HungBa',
        date: new Date(post.updated_at).toUTCString(),
      });
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
  }

  return new NextResponse(feed.xml({ indent: true }), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
