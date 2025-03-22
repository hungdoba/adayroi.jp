import Image from 'next/image';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import { Locale } from '@/i18n/routing';
import { getFullPost, getFullPostCache } from '@/actions/post';
import { MDXRemote } from 'next-mdx-remote/rsc';
import TableOfContent from '@/components/layout/TableOfContent';
import TableOfContentClient from '@/components/layout/TableOfContentClient';
import { adminInfo } from '@/utils/session';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ locale: Locale; category: string; slug: string }>;
}

export default async function FullPost({ params }: Props) {
  const admin = await adminInfo();

  const { locale, category, slug } = await params;

  const fullPost = await getFullPost(locale, category, slug);
  console.log(fullPost);

  if (!fullPost) {
    notFound();
  }

  return (
    <div className="container mx-auto w-full my-4 md:max-w-5xl">
      <div className="flex flex-col md:flex-row mx-4 md:mx-8">
        {/* Main article */}
        <div className="w-full md:w-3/4">
          <h1 className="text-4xl font-bold my-4">
            {fullPost.post_title || 'No Title'}
          </h1>
          <Image
            className="w-full rounded"
            width={1920}
            height={1280}
            src={fullPost.header_image}
            alt="Article Image"
            priority
            sizes="(min-width: 1360px) 920px, (min-width: 780px) 66.96vw, (min-width: 680px) 608px, calc(94.44vw - 15px)"
            style={{
              maxWidth: '100%',
              height: 'auto',
            }}
          />
          <div className="prose dark:prose-invert max-w-none overflow-hidden mt-4 mdx-remote-a-blue prose-a:no-underline prose-a:text-cyan-500">
            {/* <MDXRemote
              source={fullPost.post_content}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [rehypeSlug],
                },
              }}
            /> */}
            {fullPost.post_content}
          </div>
        </div>

        {/* Table of Content */}
        <div className="w-full md:w-1/4">
          {/* <TableOfContentClient isAdmin={admin != false} slug={slug}>
            <TableOfContent data={fullPost} />
          </TableOfContentClient> */}
        </div>
      </div>
    </div>
  );
}
