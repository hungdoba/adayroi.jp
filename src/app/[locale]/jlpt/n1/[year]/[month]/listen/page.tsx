import Link from 'next/link';
import { jlpt_chokai } from '@prisma/client';
import Mondai from '@/components/jlpt/listen/Mondai';
import Mondai5 from '@/components/jlpt/listen/Mondai5';
import { getJLPTListenFullDetailCache } from '@/actions/jlpt';
import { getTranslations } from 'next-intl/server';

type Props = {
  params: Promise<{ year: string; month: string }>;
};

export default async function JLPTDetail({ params }: Props) {
  const { year, month } = await params;
  const t = await getTranslations('JlptPage');
  const data = await getJLPTListenFullDetailCache(year, month);

  function getMondai(mondaiNumber: number): jlpt_chokai[] {
    const mondai = data.filter((value) => value.mondai_number === mondaiNumber);
    return mondai;
  }

  return (
    <div className="container mx-auto w-full mt-4 md:max-w-5xl">
      <div className="mx-4 md:mx-8">
        <div className="space-y-2 pb-8 md:pt-6 md:space-y-5">
          <h1 className="text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-4xl md:leading-14">
            JLPT N1
          </h1>
          <div className="flex justify-between">
            <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
              {`${year} - ${month}`}
            </p>
            <Link href={`./read`}>{t('gotoReading')}</Link>
          </div>
        </div>
        <hr />
      </div>
      <div className="underline-offset-4">
        <Mondai questions={getMondai(1)} mondai_number={1} />
        <Mondai questions={getMondai(2)} mondai_number={2} />
        <Mondai questions={getMondai(3)} mondai_number={3} />
        <Mondai questions={getMondai(4)} mondai_number={4} />
        <Mondai5 questions={getMondai(5)} />
      </div>
      <div className="mx-4 md:mx-8 space-y-2 pb-6 pt-0 md:space-y-5">
        <hr className="pb-4" />
        <div className="flex justify-between">
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            {`${year} - ${month}`}
          </p>
          <Link href={`./read`}>{t('gotoReading')}</Link>
        </div>
      </div>
    </div>
  );
}
