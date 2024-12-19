"use client";

import { cn } from "@/utils/cn";
import { useState } from "react";
import { FaRegQuestionCircle } from "react-icons/fa";

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
  const [showAnswer, setShowAnswer] = useState(false);

  const iconVisibilityClass =
    isCorrectAnswer && showHint ? "block" : "collapse";

  const borderColorClass = selected
    ? showHint
      ? isCorrectAnswer
        ? "border-green-600" // Selected, showHint, and correct answer
        : "border-red-600" // Selected, showHint, but incorrect answer
      : "border-blue-400" // Selected, but not showing hint
    : showHint && isCorrectAnswer
    ? "border-green-600" // Not selected, but showHint and correct answer
    : "border-transparent"; // Not selected and not showing hint or incorrect answer

  return (
    <div className={cn(className, "flex flex-row mr-4 items-center")}>
      <div
        onClick={select}
        className={cn(
          "flex flex-row hover:cursor-pointer hover:border-blue-300 border rounded-md px-2 mr-2",
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
        className={cn(
          iconVisibilityClass,
          showAnswer && "text-green-600",
          "hover:cursor-pointer"
        )}
        onClick={() => {
          showExplain();
          setShowAnswer(!showAnswer);
        }}
      />
    </div>
  );
}
