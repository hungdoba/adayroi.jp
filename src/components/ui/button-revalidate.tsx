import { cn } from "@/utils/cn";
import { revalidateTag } from "next/cache";
import { ClassNameProps } from "@/types/ClassName";

interface Props extends ClassNameProps {
  tag: string;
  label: string;
}

// Using in admin page to revalidate cached data
export function ButtonRevalidate({ tag, label, className }: Props) {
  return (
    <form
      action={async () => {
        "use server";
        revalidateTag(tag);
      }}
      className="w-full"
    >
      <button
        type="submit"
        className={cn(
          "w-full text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700",
          className
        )}
      >
        {label}
      </button>
    </form>
  );
}
