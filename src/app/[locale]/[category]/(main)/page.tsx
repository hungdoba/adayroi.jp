import { Locale } from '@/i18n/routing';
import { getCategory } from '@/actions/category';
import { getPostsByCategoryCache } from '@/actions/post';
import PostsCategoryWrapper from '@/components/forms/PostsCategoryWrapper';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{
    category: string;
    locale: Locale;
  }>;
};

export default async function Home({ params }: Props) {
  const { category, locale } = await params;
  const postCategory = await getCategory(locale, category);

  if (!postCategory) {
    notFound();
  }

  const posts = await getPostsByCategoryCache(locale, category, 1);
  return (
    <PostsCategoryWrapper
      locale={locale}
      category={postCategory!}
      posts={posts}
    />
  );
}
