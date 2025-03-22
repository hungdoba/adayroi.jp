import { MDXRemote } from 'next-mdx-remote/rsc';
import { TranslatedPost } from '@/types/TranslatedPost';

interface Props {
  data: TranslatedPost | null;
}

export default function TableOfContent({ data }: Props) {
  return (
    <div className="w-full prose dark:prose-invert prose-a:no-underline prose-a:font-normal prose-a:text-gray-600 dark:prose-a:text-gray-400 hover-links-cyan-500">
      {data && <MDXRemote source={data.table_of_contents} />}
    </div>
  );
}
