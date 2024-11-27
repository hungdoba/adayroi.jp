"use client";

import { useState } from "react";
import { jlpt_chokai } from "@prisma/client";

import QAE from "./QAE";
import Answer from "./Answer";
import Question from "./Question";
import Explain from "../Explain";

interface Props {
  questions: jlpt_chokai[];
}

export default function Mondai5({ questions }: Props) {
  const [showHint, setShowHint] = useState(false);
  const [showExplain, setShowExplain] = useState(false);
  const [q1selectedOption, setQ1SelectedOption] = useState(0);
  const [q2selectedOption, setQ2SelectedOption] = useState(0);

  const is3Questions = questions.length == 3;

  return (
    <div className="container mx-auto w-full mt-4 md:max-w-5xl">
      <div className="mx-4 md:mx-8">
        <div className="flex flex-col mb-4 md:mb-8 md:mt-8">
          <h2 className="mb-4">
            問題5
            では長めの話を聞きます。この問題には練習はありません。メモをとってもかまいません。
          </h2>
          <div className="flex flex-row  mb-2">
            <div className="flex flex-col">
              <h2 className="mb-4">
                {`
                1番、${
                  is3Questions && "2番、"
                }問題用紙に何も印刷されていません。まず話を聞いてください。それから、質問とせんたくしを聞いて、(1)から
                (4)の中から、最もよいものを一つ選んでください。
                `}
              </h2>
              <QAE question={questions[0]} />
              {is3Questions && <QAE question={questions[1]} />}
              <h2 className="mb-4">
                {`
                ${is3Questions ? "3番" : "2番"}
                、まず話を聞いてください。それから、二つの質問を聞いて、それぞれ問題用紙の(1)から(4)の中から、最もよいものを一つ選んでください。
                `}
              </h2>
              <Question
                question={is3Questions ? questions[2] : questions[1]}
                hintShowed={showHint}
                showHint={() => setShowHint(!showHint)}
              />

              <h3 className="mb-4">質問１</h3>
              <Answer
                question={is3Questions ? questions[2] : questions[1]}
                selectOption={(value: number) => setQ1SelectedOption(value)}
                selectedOption={q1selectedOption}
                hintShowed={showHint}
                showExplain={() => setShowExplain(!showExplain)}
              />

              <h3 className="mb-4">質問２</h3>
              <Answer
                question={is3Questions ? questions[2] : questions[1]}
                selectOption={(value: number) => setQ2SelectedOption(value)}
                selectedOption={q2selectedOption}
                hintShowed={showHint}
                showExplain={() => setShowExplain(!showExplain)}
              />
            </div>
          </div>
          {showExplain && (
            <Explain isAdmin={false} content={questions[2].script} />
          )}
        </div>
      </div>
    </div>
  );
}
