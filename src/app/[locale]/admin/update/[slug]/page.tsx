import { getCategoriesCache } from '@/actions/category';
import { getPostData } from '@/actions/post';
import PostForm from '@/components/forms/PostCreateForm';

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function Update({ params }: Props) {
  const { slug } = await params;
  const categories = await getCategoriesCache();
  const { postStatic, postInfo, postContent } = await getPostData(slug);
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
