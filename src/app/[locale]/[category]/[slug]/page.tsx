import { Locale } from '@/i18n/routing';
import { getFullPostCache } from '@/actions/post';
import TableOfContentClient from '@/components/layout/TableOfContentClient';
import { adminInfo } from '@/utils/session';

import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkFrontmatter from 'remark-frontmatter';
import remarkRehype from 'remark-rehype';
import rehypeSanitize from 'rehype-sanitize';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeStringify from 'rehype-stringify';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Onthispage from '@/components/forms/Onthispage';

async function processMarkdown(content: string) {
  const processor = unified()
    .use(remarkParse) // Parse markdown to AST
    .use(remarkGfm) // Add GFM (tables, etc.)
    .use(remarkFrontmatter) // Handle frontmatter
    .use(remarkRehype) // Convert to HTML AST
    .use(rehypeSanitize) // Sanitize HTML
    .use(rehypeHighlight) // Syntax highlighting
    .use(rehypeSlug) // Add IDs to headings
    .use(rehypeAutolinkHeadings) // Add links to headings
    .use(rehypeStringify); // Convert to HTML string

  const result = await processor.process(content);
  return result.toString();
}

interface Props {
  params: Promise<{ locale: Locale; category: string; slug: string }>;
}

export default async function FullPost({ params }: Props) {
  const { locale, category, slug } = await params;
  const admin = await adminInfo();
  const fullPost = await getFullPostCache(locale, category, slug);

  if (!fullPost) {
    notFound();
  }

  const htmlContent = await processMarkdown(fullPost.post_content);

  return (
    <div className="container mx-auto w-full my-4 md:max-w-5xl">
      <div className="flex flex-col md:flex-row">
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
            style={{ maxWidth: '100%', height: 'auto' }}
          />
          <div
            className="prose dark:prose-invert max-w-none overflow-hidden mt-4 mdx-remote-a-blue prose-a:no-underline prose-a:text-cyan-500"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </div>

        <div className="w-full md:w-1/4">
          <TableOfContentClient isAdmin={admin != false} slug={slug}>
            <Onthispage
              className="text-sm w-[100%]"
              htmlContent={htmlContent}
            />
          </TableOfContentClient>
        </div>
      </div>
    </div>
  );
}
