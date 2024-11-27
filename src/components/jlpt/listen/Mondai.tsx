import QAE from './QAE';
import { jlpt_chokai } from '@prisma/client';

interface Props {
  mondai_number: number;
  questions: jlpt_chokai[];
}

export default function Mondai({ mondai_number, questions }: Props) {
  const getHeaderText = (mondai: number): string => {
    switch (mondai) {
      case 1:
        return '問題1 では、まず質問を聞いてください。それから話を聞いて、問題用紙の(1)から(4)の中から、最もよいものをー つ選んでください。';
      case 2:
        return '問題2 では、まず質問を聞いてください。そのあと、問題用紙のせんたくしを読んでください。読む時間があります。それから話を聞いて、問題用紙の(1)から(4)の中から、最もよいものを一つ選んでください。';
      case 3:
        return '問題3 では、問題用紙に何も印刷されていません。この問題は、全体としてどんな内容かを聞く問題です。話の前に質問はありません。まず話を聞いてください。それから、しつもんとせんたくしを聞いて、(1)から(4)の中から、最もよいものを一つ選んでください';
      case 4:
        return '問題4 では、問題用紙に何も印刷されていません。まず文を聞いてください。それから、それに対する返事を聞いて、(1)から(3)の中から、最もよいものを一つ選んでください。';
      default:
        return '問題 未定義';
    }
  };

  return (
    <div className="container mx-auto w-full mt-4 md:max-w-5xl">
      <div className="mx-4 md:mx-8">
        <div className="flex flex-col mb-4 md:mb-8 md:mt-8">
          <h2 className="mb-4">{getHeaderText(mondai_number)}</h2>
          {questions.map((question: jlpt_chokai, id: number) => {
            return <QAE key={id} question={question} />;
          })}
        </div>
      </div>
    </div>
  );
}
