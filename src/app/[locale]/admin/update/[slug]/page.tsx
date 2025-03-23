import { getCategoriesCache } from '@/actions/category';
import { getPostDataCache } from '@/actions/post';
import PostForm from '@/components/forms/PostCreateForm';

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function Update({ params }: Props) {
  const { slug } = await params;
  const categories = await getCategoriesCache();
  const { postStatic, postInfo, postContent } = await getPostDataCache(slug);
  return (
    <PostForm
      mode="update"
      categories={categories}
      initialPostStatic={postStatic}
      initialPostInfos={postInfo}
      initialPostContents={postContent}
    />
  );
}
