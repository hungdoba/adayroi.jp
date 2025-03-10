import Link from 'next/link';
import { MondaiData } from '@/types/Jlpt';
import Mondai from '@/components/jlpt/read/Mondai';
import Mondai7 from '@/components/jlpt/read/Mondai7';
import Mondai8 from '@/components/jlpt/read/Mondai8';
import Mondai9 from '@/components/jlpt/read/Mondai9';
import Mondai10 from '@/components/jlpt/read/Mondai10';
import Mondai11 from '@/components/jlpt/read/Mondai11';
import Mondai12 from '@/components/jlpt/read/Mondai12';
import Mondai13 from '@/components/jlpt/read/Mondai13';
import { getTranslations } from 'next-intl/server';
import { getJLPTReadFullDetail } from '@/actions/jlpt';
import { FiChevronUp } from 'react-icons/fi';
import ButtonScrollTop from '@/components/common/ButtonScrollTop';

type Props = {
  params: Promise<{ year: string; month: string }>;
};

export default async function JLPTDetail({ params }: Props) {
  const t = await getTranslations('JlptPage');
  const { year, month } = await params;
  const mondaiData = await getJLPTReadFullDetail(year, month);

  function getMondai(mondaiNumber: number): MondaiData {
    const mondai = mondaiData.mondai.filter(
      (value) => value.mondai_number === mondaiNumber
    );
    const question = mondaiData.questions.filter(
      (value) => value.mondai_number === mondaiNumber
    );
    return { mondai: mondai, questions: question };
  }

  const renderMondai1to6 = () =>
    [1, 2, 3, 4, 5, 6].map((mondaiNumber, index) => (
      <Mondai
        key={index}
        data={getMondai(mondaiNumber)}
        mondai_number={mondaiNumber}
      />
    ));

  return (
    <div className="container mx-auto w-full mt-4 md:max-w-5xl">
      <div className="mx-4 md:mx-8">
        <div className="space-y-2 pb-8 md:pt-6 md:space-y-5">
          <h1 className="text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-4xl md:leading-14">
            {t('title')}
          </h1>
          <div className="flex justify-between">
            <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
              {`${year} - ${month}`}
            </p>
            <Link href={`./listen`}>{t('gotoListening')}</Link>
          </div>
        </div>
        <hr />
      </div>
      <div className="underline-offset-4">
        {/* Mondai 1~6 */}
        {renderMondai1to6()}
        <Mondai7 data={getMondai(7)} />
        <Mondai8
          data1={getMondai(81)}
          data2={getMondai(82)}
          data3={getMondai(83)}
          data4={getMondai(84)}
        />
        <Mondai9
          data1={getMondai(91)}
          data2={getMondai(92)}
          data3={getMondai(93)}
          data4={getMondai(94)}
        />
        <Mondai10 data={getMondai(10)} />
        <Mondai11 data={getMondai(11)} />
        <Mondai12 data={getMondai(12)} />
        <Mondai13 data={getMondai(13)} />
      </div>
      <div className="mx-4 md:mx-8 space-y-2 pb-6 pt-0 md:space-y-5">
        <hr className="pb-4" />
        <div className="flex justify-between">
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            {`${year} - ${month}`}
          </p>
          <Link href={`./listen`}>{t('gotoListening')}</Link>
        </div>
      </div>
      <ButtonScrollTop />
    </div>
  );
}
