'use client';

import { useMemo } from 'react';
import AnswerOption from '../AnswerOption';
import { jlpt_chokai, jlpt_question } from '@prisma/client';
import { cn } from '@/utils/cn';

interface Props {
  question: jlpt_question | jlpt_chokai;
  selectedOption: number;
  selectOption: (value: number) => void;
  hintShowed: boolean;
  showExplain: () => void;
}

const getMaxTextLength = (question: jlpt_question | jlpt_chokai): number => {
  const lengths = [
    question.option_1,
    question.option_2,
    question.option_3,
    question.option_4,
  ].map((text) => text?.length ?? 0);
  return Math.max(...lengths);
};

const getOptionText = (
  question: jlpt_question | jlpt_chokai,
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

export default function Answer({
  question,
  hintShowed,
  selectOption,
  selectedOption,
  showExplain,
}: Props) {
  const maxTextLength = useMemo(() => getMaxTextLength(question), [question]);

  const cols = useMemo(() => {
    if (maxTextLength < 6) {
      return 'grid-cols-2 md:grid-cols-4';
    } else if (maxTextLength < 10) {
      return 'grid-cols-1 md:grid-cols-4';
    } else if (maxTextLength < 25) {
      return 'grid-cols-1 md:grid-cols-2';
    } else {
      return 'grid-cols-1';
    }
  }, [maxTextLength]);

  return (
    <div className={cn('mb-4 ml-4 grid', cols)}>
      {[1, 2, 3, 4].map((optionNumber) => (
        <AnswerOption
          key={optionNumber}
          optionNumber={optionNumber}
          optionText={useMemo(
            () => getOptionText(question, optionNumber),
            [question, optionNumber]
          )}
          isCorrectAnswer={question.answer === optionNumber}
          showHint={hintShowed}
          showExplain={showExplain}
          selected={selectedOption === optionNumber}
          select={() => selectOption(optionNumber)}
        />
      ))}
    </div>
  );
}
