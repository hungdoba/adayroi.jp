import { Link } from "@/i18n/routing";
import { JlptTime } from "@/types/Jlpt";
import { useTranslations } from "next-intl";

type Props = {
  times: JlptTime[];
};

export default function ExamList({ times }: Props) {
  const t = useTranslations("JlptPage");
  return (
    <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
      {times.map((data: JlptTime, id: number) => {
        return (
          <li key={id} className="py-3 sm:py-4">
            <div className="flex items-center ">
              <div className="flex-shrink-0">
                <div className="rounded-lg border border-gray-300 dark:border-gray-600 px-2 py-2">
                  N1
                </div>
              </div>
              <div className="flex-1 min-w-0 ms-4">
                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                  {`${data.year} - ${data.month}`}
                </p>
                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                  {t("detail")}
                </p>
              </div>
              <div className="space-x-4">
                <Link
                  className="inline-flex items-center"
                  href={`/jlpt/n1/${data.year}/${data.month}/read`}
                >
                  {t("gotoReading")}
                </Link>
                <Link
                  className="inline-flex items-center"
                  href={`/jlpt/n1/${data.year}/${data.month}/listen`}
                >
                  {t("gotoListening")}
                </Link>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
