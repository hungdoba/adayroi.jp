import { getCategoriesCache } from '@/actions/category';
import PostCreateForm from '@/components/forms/PostCreateForm';
import { Locale } from '@/i18n/routing';
import { PostInfo, PostStatic } from '@/types/Post';

interface Props {
  params: Promise<{
    locale: Locale;
  }>;
}

export default async function CreatePage({ params }: Props) {
  const { locale } = await params;
  const categories = await getCategoriesCache();

  const postStatic: PostStatic = {
    language: locale,
    slug: '',
    headerImage: '',
    category: 'tips',
    tags: 'tips, ',
    visible: true,
  };

  const postInfos: Record<string, PostInfo> = {
    vi: {
      title: '',
      brief: '',
      tableOfContent: '',
    },
    ja: {
      title: '',
      brief: '',
      tableOfContent: '',
    },
    en: {
      title: '',
      brief: '',
      tableOfContent: '',
    },
  };

  const postContents: Record<string, string> = {
    vi: 'Bài viết này không tồn tại trong ngôn ngữ hiện tại. Vui lòng chọn ngôn ngữ khác.',
    ja: 'この言語ではこの記事が存在しません。別の言語を選択してください。',
    en: 'This article does not exist in the current language. Please select another language.',
  };

  return (
    <PostCreateForm
      mode="create"
      categories={categories}
      initialPostStatic={postStatic}
      initialPostInfos={postInfos}
      initialPostContents={postContents}
    />
  );
}
