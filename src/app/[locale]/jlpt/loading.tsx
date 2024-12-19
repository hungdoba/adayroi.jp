import { useTranslations } from "next-intl";

export default function Loading() {
  const t = useTranslations("JlptPage");
  const elements = Array.from({ length: 5 }, (_, index) => index + 1);
  return (
    <div className="container mx-auto w-full mt-4 md:max-w-5xl">
      <div className="mx-4 md:mx-8">
        <div className="space-y-2 pb-8 md:pt-6 md:space-y-5">
          <h1 className="text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-4xl md:leading-14">
            {t("title")}
          </h1>
          <div className="flex justify-between">
            <div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700 w-16" />
            <p>{t("gotoListening")}</p>
          </div>
        </div>
        <hr />
        {elements.map((element) => (
          <div key={element} className="flex flex-col mb-4 md:mb-8 md:mt-8">
            <div className="mb-4">
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-72 md:w-96 mb-4" />
            </div>
            {elements.map((element) => (
              <div
                key={element}
                className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
