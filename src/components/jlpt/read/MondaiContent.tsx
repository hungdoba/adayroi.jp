"use client";
import { useState } from "react";
import { cn } from "@/utils/cn";
import Explain from "../Explain";
import { jlpt_mondai } from "@prisma/client";
import { FaRegLightbulb } from "react-icons/fa";

interface Props {
  mondai: jlpt_mondai;
}

export default function MondaiContent({ mondai }: Props) {
  const [showHint, setShowHint] = useState(false);

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between items-center">
        <h2>
          {mondai.mondai_number > 80 && `（${mondai.mondai_number % 10}）`}
        </h2>
        <FaRegLightbulb
          onClick={() => setShowHint(!showHint)}
          className={cn(
            "w-4 h-4 ml-2 cursor-pointer",
            showHint && "text-yellow-600"
          )}
        />
      </div>

      {/* Mondai's question content */}
      <div
        className="my-4 whitespace-pre-wrap"
        dangerouslySetInnerHTML={{ __html: mondai.mondai_content }}
      />

      {/* Mondai's question translate (note) */}
      <Explain isShowed={showHint} content={mondai.note} />
    </div>
  );
}
