import QAE from './QAE';
import { MondaiData } from '@/types/Jlpt';
import MondaiContent from './MondaiContent';
import { jlpt_question } from '@prisma/client';

interface Props {
  data: MondaiData;
}

export default function Mondai11({ data }: Props) {
  return (
    <div className="container mx-auto w-full mt-4 md:max-w-5xl">
      <div className="mx-4 md:mx-8">
        <div className="flex flex-col mb-4 md:mb-8 md:mt-8">
          <h2 className="mb-4">{`問題１１　AとBの意見文を読んで、後の問いに対する答えとして、最もよいものを、１・２・３・４から一つ選びなさい。`}</h2>
          <MondaiContent mondai={data.mondai[0]} />
          {data.questions.map((question: jlpt_question, id: number) => (
            <QAE key={id} question={question} />
          ))}
        </div>
      </div>
    </div>
  );
}
