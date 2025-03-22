'use client';

import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { Locale } from '@/i18n/routing';
import useGetPosts from '@/hooks/usePosts';
import { TranslatedPost } from '@/types/TranslatedPost';
import { useTranslations } from 'next-intl';
import PostThumbnail from './PostThumbnail';

type Props = {
  locale: Locale;
  posts: TranslatedPost[];
};

const PostsWrapper = ({ locale, posts }: Props) => {
  const t = useTranslations('HomePage');
  const tp = useTranslations('FullPost');

  const { ref, inView } = useInView();
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } = useGetPosts(
    locale,
    posts
  );

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  return (
    <div className="container mx-auto w-full mt-4 md:max-w-5xl">
      <div className="mx-4 md:mx-8">
        <div className="space-y-2 pb-8 md:pt-6 md:space-y-5">
          <h1 className="text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-4xl md:leading-14">
            {t('title')}
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            {t('brief')}
          </p>
        </div>
        <hr className="mb-4" />
        <div className="divide-y divide-gray-300 dark:divide-gray-600">
          <div className="grid gap-x-4 grid-cols-1 md:grid-cols-1">
            {data?.pages.map((group, i) => (
              <React.Fragment key={i}>
                {group?.map((post) => (
                  <PostThumbnail post={post} key={post.id} />
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
      <div ref={ref} />
      <div className="flex items-center justify-center">
        {isFetchingNextPage && hasNextPage ? (
          <p className="text-center p-8">{tp('loadingMore')}</p>
        ) : (
          <p className="text-center p-8">{tp('noMorePost')}</p>
        )}
      </div>
    </div>
  );
};

export default PostsWrapper;
