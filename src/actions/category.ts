'use server';

import { Locale } from '@/i18n/routing';
import prisma from '@/libs/prisma';
import { unstable_cache } from 'next/cache';

async function getCategories(locale?: Locale) {
  return prisma.post_category.findMany({
    orderBy: { id: 'asc' },
    where: {
      active: true,
      locale,
    },
  });
}

export async function getCategory(locale: Locale, slug: string) {
  return prisma.post_category.findFirst({
    orderBy: { id: 'asc' },
    where: {
      active: true,
      locale,
      slug,
    },
  });
}

export const getCategoriesCache = unstable_cache(
  async (locale?: Locale) => getCategories(locale),
  ['categories'],
  { tags: ['categories'] }
);
