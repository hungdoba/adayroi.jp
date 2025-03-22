'use server';

import prisma from '@/libs/prisma';
import { Locale } from '@/i18n/routing';
import { TranslatedPost } from '@/types/TranslatedPost';
import { post, post_translation } from '@prisma/client';
import { PostInfo, PostStatic } from '@/types/Post';
import { unstable_cache } from 'next/cache';

type FullPost = post & { post_translation: post_translation[] };

function convertFullPostToTranslatedPost(post: FullPost): TranslatedPost {
  const translation = post.post_translation[0] || {};
  return {
    id: post.id,
    slug: post.slug,
    post_category: post.post_category,
    tags: post.tags,
    header_image: post.header_image,
    created_at: post.created_at,
    updated_at: post.updated_at,
    change_freq: post.change_freq || '',
    priority: post.priority || 0.5,
    active: post.active ?? undefined,
    language_code: translation.language_code || '',
    post_title: translation.post_title || '',
    post_brief: translation.post_brief || '',
    table_of_contents: translation.table_of_contents || '',
    post_content: translation.post_content || '',
  };
}

function mapPostsToTranslatedPosts(posts: FullPost[]): TranslatedPost[] {
  return posts.map(convertFullPostToTranslatedPost);
}

async function fetchAllPostsSiteMap(locale: Locale): Promise<TranslatedPost[]> {
  const posts = await prisma.post.findMany({
    orderBy: { updated_at: 'desc' },
    include: {
      post_translation: { where: { language_code: locale } },
    },
  });
  return mapPostsToTranslatedPosts(posts);
}

async function fetchPosts({
  locale,
  pageParam = 1,
  category,
}: {
  locale: Locale;
  pageParam?: number;
  category?: string;
}): Promise<TranslatedPost[]> {
  const filters: { active: boolean; post_category?: string } = { active: true };
  if (category) filters.post_category = category;

  const posts = await prisma.post.findMany({
    where: filters,
    orderBy: { updated_at: 'desc' },
    include: {
      post_translation: { where: { language_code: locale } },
    },
    skip: (pageParam - 1) * 5,
    take: 5,
  });

  return mapPostsToTranslatedPosts(posts);
}

async function getFullPost(
  locale: Locale,
  category: string,
  slug: string
): Promise<TranslatedPost | null> {
  const post = await prisma.post.findFirst({
    where: { post_category: category, slug },
    include: {
      post_translation: { where: { language_code: locale } },
    },
  });

  return post ? convertFullPostToTranslatedPost(post) : null;
}

export async function updatePost(formData: FormData): Promise<boolean> {
  const id = formData.get('id') as string;
  const slug = formData.get('slug') as string;
  const post_category = formData.get('post_category') as string;
  const tags = (formData.get('tags') as string)
    .split(',')
    .map((tag) => tag.trim());
  const header_image = formData.get('header_image') as string;
  const active = formData.get('active') === 'true';
  const translations = JSON.parse(formData.get('translations') as string);

  if (!id || !slug || !post_category || !translations) {
    console.error('Missing required fields');
    return false;
  }

  try {
    await prisma.post.update({
      where: { id: Number(id) },
      data: { slug, post_category, tags, header_image, active },
    });

    await Promise.all(
      translations.map((translation: post_translation) =>
        prisma.post_translation.upsert({
          where: {
            post_id_language_code: {
              post_id: Number(id),
              language_code: translation.language_code,
            },
          },
          update: {
            post_title: translation.post_title,
            post_brief: translation.post_brief,
            table_of_contents: translation.table_of_contents,
            post_content: translation.post_content,
          },
          create: {
            post_id: Number(id),
            language_code: translation.language_code,
            post_title: translation.post_title,
            post_brief: translation.post_brief,
            table_of_contents: translation.table_of_contents,
            post_content: translation.post_content,
          },
        })
      )
    );

    return true;
  } catch (error) {
    console.error('Error updating post:', error);
    return false;
  }
}

export async function createPost(
  formData: FormData
): Promise<{ message: string; data: FullPost }> {
  const slug = formData.get('slug') as string;
  const post_category = formData.get('post_category') as string;
  const tags = (formData.get('tags') as string)
    .split(',')
    .map((tag) => tag.trim());
  const header_image = (formData.get('header_image') as string) || null;
  const active = formData.get('active') === 'true';
  const translations = JSON.parse(formData.get('translations') as string);

  if (!slug || !post_category || !translations) {
    throw new Error('Missing required fields');
  }

  try {
    const newPost = await prisma.post.create({
      data: {
        slug,
        post_category,
        tags: tags || [],
        header_image: header_image!,
        active: Boolean(active) || false,
        change_freq: 'monthly',
        priority: 0.8,
        post_translation: {
          create: translations.map((translation: post_translation) => ({
            language_code: translation.language_code,
            post_title: translation.post_title,
            post_brief: translation.post_brief,
            table_of_contents: translation.table_of_contents,
            post_content: translation.post_content,
          })),
        },
      },
      include: { post_translation: true },
    });

    return { message: 'Post created successfully', data: newPost };
  } catch (error) {
    console.error('Error creating post:', error);
    throw new Error('Internal Server Error');
  }
}

export async function getPostData(slug: string) {
  const data = await prisma.post.findMany({
    where: { slug },
    include: { post_translation: true },
  });

  const postData = data[0];
  const postStatic: PostStatic = {
    id: postData.id,
    language: 'vi',
    slug: postData.slug,
    headerImage: postData.header_image,
    category: postData.post_category,
    tags: postData.tags.join(', '),
    visible: postData.active ?? false,
  };

  const info: Record<string, PostInfo> = {};
  const content: Record<string, string> = {};

  postData.post_translation.forEach((translation: post_translation) => {
    info[translation.language_code] = {
      title: translation.post_title,
      brief: translation.post_brief,
      tableOfContent: translation.table_of_contents,
    };
    content[translation.language_code] = translation.post_content;
  });

  return { postStatic, postInfo: info, postContent: content };
}

export const getPostsCache = unstable_cache(
  async (locale: Locale, pageParam: number) =>
    fetchPosts({ locale, pageParam }),
  ['posts'],
  { tags: ['posts'] }
);

export const getPostsByCategoryCache = unstable_cache(
  async (locale: Locale, category: string, pageParam: number) =>
    fetchPosts({ locale, category, pageParam }),
  ['posts'],
  { tags: ['posts'] }
);

export const getFullPostCache = unstable_cache(
  async (locale: Locale, category: string, slug: string) =>
    getFullPost(locale, category, slug),
  ['posts'],
  { tags: ['posts'] }
);

export const getAllPostsSiteMapCache = unstable_cache(
  async (locale: Locale) => fetchAllPostsSiteMap(locale),
  ['posts-sitemap'],
  { tags: ['posts-sitemap'] }
);
