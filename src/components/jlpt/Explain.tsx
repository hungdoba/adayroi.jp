import { cn } from "@/utils/cn";
import { AutosizeTextarea } from "../ui/AutosizeTextarea";

interface Props {
  isShowed: boolean;
  content: string | null;
}

export default function Explain({ content, isShowed }: Props) {
  return (
    <div
      className={cn(
        "w-full mb-4 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 transition-all duration-500 overflow-hidden",
        isShowed ? "max-h-screen border border-gray-200" : "max-h-0"
      )}
    >
      <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
        <AutosizeTextarea
          readOnly
          className="w-full px-0 text-sm text-gray-900 bg-white focus:outline-none dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
          value={content ?? ""}
        />
      </div>
    </div>
  );
}
