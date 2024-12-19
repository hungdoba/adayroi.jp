"use client";
import { useState } from "react";

import Question from "./Question";
import Explain from "../Explain";
import { jlpt_chokai } from "@prisma/client";
import Answer from "../common/Answer";

interface Props {
  question: jlpt_chokai;
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

  return (
    <div>
      <Question
        question={question}
        hintShowed={hintShowed}
        showHint={() => setShowHint(!hintShowed)}
      />
      <Answer
        question={question}
        hintShowed={hintShowed}
        showExplain={() => setShowExplain(!showExplain)}
        selectOption={(value: number) => handleSelectOption(value)}
        selectedOption={selectedOption}
      />
      <Explain isShowed={showExplain && hintShowed} content={question.script} />
    </div>
  );
}
