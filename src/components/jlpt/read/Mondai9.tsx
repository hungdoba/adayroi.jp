import QAE from './QAE';
import { MondaiData } from '@/types/Jlpt';
import MondaiContent from './MondaiContent';
import { jlpt_question } from '@prisma/client';

interface Props {
  data1: MondaiData;
  data2: MondaiData;
  data3: MondaiData;
  data4: MondaiData;
  isAdmin: boolean;
}

export default function Mondai9({
  data1,
  data2,
  data3,
  data4,
  isAdmin,
}: Props) {
  return (
    <div className="container mx-auto w-full mt-4 md:max-w-5xl">
      <div className="mx-4 md:mx-8">
        <div className="flex flex-col mb-4 md:mb-8 md:mt-8">
          <h2 className="mb-4">
            問題９　次の（１）～（３）の文章を読んで、後の問いに対する答えとして最もよいものを、１・２・３・４から一つ選びなさい。
          </h2>

          {/* Q1 */}
          <div>
            <div className="flex flex-col">
              <MondaiContent isAdmin={isAdmin} mondai={data1.mondai[0]} />
              {data1.questions.map((question: jlpt_question, id: number) => (
                <QAE key={id} question={question} isAdmin={isAdmin} />
              ))}
            </div>
          </div>

          {/* Q2 */}
          <div>
            <div className="flex flex-col">
              <MondaiContent isAdmin={isAdmin} mondai={data2.mondai[0]} />
              {data2.questions.map((question: jlpt_question, id: number) => (
                <QAE key={id} question={question} isAdmin={isAdmin} />
              ))}
            </div>
          </div>

          {/* Q3 */}
          <div>
            <div className="flex flex-col">
              <MondaiContent isAdmin={isAdmin} mondai={data3.mondai[0]} />
              {data3.questions.map((question: jlpt_question, id: number) => (
                <QAE key={id} question={question} isAdmin={isAdmin} />
              ))}
            </div>
          </div>

          {/* Q4 */}
          {data4.mondai.length > 0 && (
            <div>
              <div className="flex flex-col">
                <MondaiContent isAdmin={isAdmin} mondai={data4.mondai[0]} />
                {data4.questions.map((question: jlpt_question, id: number) => (
                  <QAE key={id} question={question} isAdmin={isAdmin} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
