import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { TranslatedPost } from "@/types/TranslatedPost";

type Props = { post: TranslatedPost };
export default function PostThumbnail({ post }: Props) {
  const t = useTranslations("PostList");
  return (
    <div className="flex border-b border-gray-200 dark:border-gray-500 items-stretch w-full p-2 md:p-6 md:py-8">
      <div className="w-1/3 max-h-fit">
        <Image
          src={post.header_image}
          alt="Post Image"
          className="w-full h-full rounded-lg object-cover object-center"
          height={1280}
          width={1920}
          sizes="(min-width: 1360px) 297px, (min-width: 780px) 22.32vw, (min-width: 680px) 202px, calc(31.39vw - 5px)"
          style={{
            objectFit: "cover",
            maxWidth: "100%",
            height: "auto",
          }}
        />
      </div>
      <div className="flex flex-col justify-around w-2/3 pl-6">
        <h2 className="mb-2 md:text-xl md:font-bold">{post.post_title}</h2>
        <p className="hidden md:block font-normal text-gray-700 dark:text-gray-200">
          {post.post_brief}
        </p>
        <p className="font-semibold text-sm my-2 md:my-4 text-gray-600 dark:text-gray-400">
          {new Date(post.created_at).toLocaleDateString()}
        </p>
        <Link href={`/${post.post_category}/${post.slug}`}>
          {t("readMore")}
        </Link>
      </div>
    </div>
  );
}
