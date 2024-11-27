import QAE from './QAE';
import { MondaiData } from '@/types/Jlpt';
import { jlpt_question } from '@prisma/client';

interface Props {
  mondai_number: number;
  data: MondaiData;
  isAdmin: boolean;
}

export default function Mondai({ mondai_number, data, isAdmin }: Props) {
  const getHeaderText = (mondai: number): string => {
    switch (mondai) {
      case 1:
        return '問題１　＿＿＿の言葉の読み方として最もよいものを、１・２・３・４から一つ選びなさい。';
      case 2:
        return '問題２（　　）に入れるのに最もよいものを、１・２・３・４から一つ選びなさい。';
      case 3:
        return '問題３　＿＿＿の言葉に意味が最も近いものを、１・２・３・４から一つ選びなさい。';
      case 4:
        return '問題４　次の言葉の近い方として最もよいものを、１・２・３・４から一つ選びなさい。';
      case 5:
        return '問題５　次の文の（　　）に入れるのに最もよいものを、１・２・３・４から一つ選びなさい。';
      case 6:
        return '問題６　次の文の＿★＿に入る最もよいものを、１・２・３・４から一つ選びなさい。';
      default:
        return '問題 未定義';
    }
  };

  return (
    <div className="container mx-auto w-full mt-4 md:max-w-5xl">
      <div className="mx-4 md:mx-8">
        <div className="flex flex-col mb-4 md:mb-8 md:mt-8">
          <h2 className="mb-4">{getHeaderText(mondai_number)}</h2>
          {data.questions.map((data: jlpt_question) => {
            return <QAE key={data.id} question={data} isAdmin={isAdmin} />;
          })}
        </div>
      </div>
    </div>
  );
}
