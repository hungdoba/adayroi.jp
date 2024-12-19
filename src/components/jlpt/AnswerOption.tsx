'use client';

import { cn } from '@/utils/cn';
import { FaRegQuestionCircle } from 'react-icons/fa';
import { useMemo } from 'react';

interface Props {
  optionNumber: number;
  optionText: string | null;
  isCorrectAnswer: boolean;
  showHint: boolean;
  selected: boolean;
  showExplain: () => void;
  select: () => void;
  className?: string;
}

export default function AnswerOption({
  optionNumber,
  optionText,
  isCorrectAnswer,
  showHint,
  selected,
  showExplain,
  select,
  className,
}: Props) {
  const iconVisibilityClass = useMemo(() => {
    return isCorrectAnswer && showHint ? 'block' : 'collapse';
  }, [isCorrectAnswer, showHint]);

  const borderColorClass = useMemo(() => {
    if (selected) {
      if (showHint) {
        return isCorrectAnswer ? 'border-green-600' : 'border-red-600';
      } else {
        return 'border-blue-400';
      }
    } else {
      return showHint && isCorrectAnswer
        ? 'border-green-600'
        : 'border-transparent';
    }
  }, [selected, showHint, isCorrectAnswer]);

  return (
    <div className={cn(className, 'flex flex-row mr-4 items-center')}>
      <div
        onClick={select}
        className={cn(
          'flex flex-row hover:cursor-pointer hover:border-blue-300 border rounded-md px-2 mr-2',
          borderColorClass
        )}
      >
        <div className="mr-4">{optionNumber}</div>
        <p
          dangerouslySetInnerHTML={{
            __html: optionText!,
          }}
        />
      </div>
      <FaRegQuestionCircle
        className={cn(iconVisibilityClass, 'hover:cursor-pointer')}
        onClick={showExplain}
      />
    </div>
  );
}
