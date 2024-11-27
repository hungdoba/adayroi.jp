import QAE from './QAE';
import { MondaiData } from '@/types/Jlpt';
import MondaiContent from './MondaiContent';
import { jlpt_question } from '@prisma/client';

interface Props {
  data: MondaiData;
  isAdmin: boolean;
}

export default function Mondai7({ data, isAdmin }: Props) {
  const from_number = data.questions[0].question_number;
  const to_number = data.questions[data.questions.length - 1].question_number;
  return (
    <div className="container mx-auto w-full mt-4 md:max-w-5xl">
      <div className="mx-4 md:mx-8">
        <div className="flex flex-col mb-4 md:mb-8 md:mt-8">
          <h2 className="mb-4">{`問題７　次の文章を読んで、${from_number} から ${to_number} の中に入る最もよいものを、１・２・３・４から一つ選びなさい。`}</h2>
          <MondaiContent isAdmin={isAdmin} mondai={data.mondai[0]} />
          {data.questions.map((question: jlpt_question, id: number) => (
            <QAE key={id} question={question} isAdmin={isAdmin} />
          ))}
        </div>
      </div>
    </div>
  );
}
