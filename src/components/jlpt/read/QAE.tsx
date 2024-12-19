"use client";

import { useState } from "react";

import Answer from "../common/Answer";
import Explain from "../Explain";
import Question from "./Question";
import { jlpt_question } from "@prisma/client";

interface Props {
  question: jlpt_question;
}

export default function QAE({ question }: Props) {
  const [hintShowed, setShowHint] = useState(false);
  const [showExplain, setShowExplain] = useState(false);
  const [selectedOption, setSelectedOption] = useState(0);

  function handleSelectOption(value: number): void {
    if (value == selectedOption) {
      setSelectedOption(0);
      return;
    }
    setSelectedOption(value);
  }

  function handleShowHint(): void {
    setShowHint(!hintShowed);
    setShowExplain(hintShowed ? false : showExplain);
  }

  return (
    <div>
      <Question
        question={question}
        hintShowed={hintShowed}
        showHint={handleShowHint}
      />
      <Answer
        question={question}
        hintShowed={hintShowed}
        showExplain={() => setShowExplain(!showExplain)}
        selectOption={(value: number) => handleSelectOption(value)}
        selectedOption={selectedOption}
      />
      <Explain isShowed={hintShowed && showExplain} content={question.note} />
    </div>
  );
}
