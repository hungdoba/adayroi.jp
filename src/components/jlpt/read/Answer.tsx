'use client';

import { useEffect, useState } from 'react';
import AnswerOption from '../AnswerOption';
import { jlpt_question } from '@prisma/client';
import Editor from '@/components/common/Editor';
import { updateQuestionContent, updateQuestionOption } from '@/actions/jlpt';
import toast from 'react-hot-toast';

interface Props {
  question: jlpt_question;
  selectedOption: number;
  selectOption: (value: number) => void;
  hintShowed: boolean;
  showExplain: () => void;
}

const getOptionText = (
  question: jlpt_question,
  optionNumber: number
): string | null => {
  switch (optionNumber) {
    case 1:
      return question.option_1;
    case 2:
      return question.option_2;
    case 3:
      return question.option_3;
    case 4:
      return question.option_4;
    default:
      return null;
  }
};

const getMaxTextLength = (question: jlpt_question): number => {
  const lengths = [
    question.option_1,
    question.option_2,
    question.option_3,
    question.option_4,
  ].map((text) => text?.length ?? 0);
  return Math.max(...lengths);
};

export default function Answer({
  question,
  hintShowed,
  selectOption,
  selectedOption,
  showExplain,
}: Props) {
  const [cols, setCols] = useState<string | undefined>();
  const maxTextLength = getMaxTextLength(question);

  useEffect(() => {
    const handleResize = () => {
      if (maxTextLength < 6) {
        setCols('grid-cols-2 md:grid-cols-4');
      } else if (maxTextLength < 10) {
        setCols('grid-cols-1 md:grid-cols-4');
      } else if (maxTextLength < 25) {
        setCols('grid-cols-1 md:grid-cols-2');
      } else {
        setCols('grid-cols-1');
      }
    };

    handleResize();
  }, [maxTextLength]);

  async function handleSave(content: string, optionNumber: number) {
    const formData = new FormData();
    formData.append('id', String(question.id));
    formData.append('no', optionNumber.toString());
    formData.append('content', content);

    const result = await updateQuestionOption(formData);
    toast.success('Option updated');
    // setContentUpdated(result);
  }

  return (
    <div className={`mb-4 ml-4 grid ${cols ?? 'grid-cols-2 md:grid-cols-4'}`}>
      {[1, 2, 3, 4].map((optionNumber) => (
        <Editor
          key={optionNumber}
          content={getOptionText(question, optionNumber) ?? ''}
          onSave={(content) => handleSave(content, optionNumber)}
        />

        // <AnswerOption
        //   key={optionNumber}
        //   optionNumber={optionNumber}
        //   optionText={getOptionText(question, optionNumber)}
        //   isCorrectAnswer={question.answer === optionNumber}
        //   showHint={hintShowed}
        //   showExplain={showExplain}
        //   selected={selectedOption === optionNumber}
        //   select={() => selectOption(optionNumber)}
        // />
      ))}
    </div>
  );
}
