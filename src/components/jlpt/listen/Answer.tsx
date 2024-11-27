'use client';

import AnswerOption from '../AnswerOption';
import { jlpt_chokai } from '@prisma/client';

interface Props {
  question: jlpt_chokai;
  selectedOption: number;
  selectOption: (value: number) => void;
  hintShowed: boolean;
  showExplain: () => void;
}

// Utility function to get the option text safely
const getOptionText = (
  question: jlpt_chokai,
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
  return (
    question && (
      <div className="flex flex-wrap justify-between mb-4 ml-4">
        {[1, 2, 3, 4].map(
          (optionNumber) =>
            (optionNumber <= 3 || question.mondai_number !== 4) && (
              <AnswerOption
                key={optionNumber}
                optionNumber={optionNumber}
                optionText={getOptionText(question, optionNumber)}
                isCorrectAnswer={question.answer === optionNumber}
                showHint={hintShowed}
                showExplain={showExplain}
                selected={selectedOption === optionNumber}
                select={() => selectOption(optionNumber)}
              />
            )
        )}
      </div>
    )
  );
}
