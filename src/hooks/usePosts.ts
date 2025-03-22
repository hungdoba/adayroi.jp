'use client';

import { useInfiniteQuery } from '@tanstack/react-query';

import { getPostsCache, getPostsByCategoryCache } from '@/actions/post';
import { Locale } from '@/i18n/routing';
import { TranslatedPost } from '@/types/TranslatedPost';

export default function usePosts(
  locale: Locale,
  initialData: TranslatedPost[]
) {
  return useInfiniteQuery<TranslatedPost[]>({
    queryKey: ['posts', locale],
    queryFn: ({ pageParam = 1 }) => getPostsCache(locale, pageParam as number),
    initialData: { pages: [initialData], pageParams: [1] },
    initialPageParam: 1,
    getNextPageParam(lastPage, allPages) {
      return lastPage.length > 0 ? allPages.length + 1 : undefined;
    },
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
}

export function useGetPostsByCategory(
  locale: Locale,
  category: string,
  initialData: TranslatedPost[]
) {
  return useInfiniteQuery<TranslatedPost[]>({
    queryKey: ['posts', locale, category],
    queryFn: ({ pageParam = 1 }) =>
      getPostsByCategoryCache(locale, category, pageParam as number),
    initialData: { pages: [initialData], pageParams: [1] },
    initialPageParam: 1,
    getNextPageParam(lastPage, allPages) {
      return lastPage.length > 0 ? allPages.length + 1 : undefined;
    },
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
}
