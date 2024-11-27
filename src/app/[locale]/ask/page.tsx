import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export default function AskPage() {
  const t = useTranslations("AskAIPage");
  return (
    <div className="flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-bold mb-4">{t("title")}</h1>
      <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">
        {t("message")}
      </p>
      <div className="flex space-x-4">
        <Link
          href="/"
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full shadow-lg transition duration-300"
        >
          {t("button")}
        </Link>
      </div>
    </div>
  );
}
