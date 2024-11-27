import { getJLPTTimesCache } from '@/actions/jlpt';
import ExamList from '@/components/jlpt/ExamList';
import { getTranslations } from 'next-intl/server';

export default async function JLPT() {
  const t = await getTranslations('JlptPage');
  const times = await getJLPTTimesCache();

  return (
    <div className="container mx-auto w-full mt-4 md:max-w-5xl">
      <div className="mx-4 md:mx-8">
        <div className="space-y-2 pb-8 md:pt-6 md:space-y-5">
          <h1 className="text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-4xl md:leading-14">
            {t('title')}
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            {t('brief')}
          </p>
        </div>
        <hr />
        <div className="divide-y divide-gray-300 dark:divide-gray-600 ">
          <ExamList times={times} />
        </div>
      </div>
    </div>
  );
}
