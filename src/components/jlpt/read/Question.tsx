import { cn } from "@/utils/cn";
import Bookmark from "../../common/Bookmark";
import { jlpt_question } from "@prisma/client";
import { FaRegLightbulb } from "react-icons/fa";

interface Props {
  question: jlpt_question;
  hintShowed: boolean;
  showHint: () => void;
}

export default function Question({ question, hintShowed, showHint }: Props) {
  return (
    <div className="flex flex-row justify-between mb-2 w-full">
      <div className="flex flex-row w-full">
        <h3 className="min-w-6 h-6 px-1 mr-2 flex justify-center align-middle items-center border border-gray-500 rounded">
          {question.question_number}
        </h3>
        <h3
          dangerouslySetInnerHTML={{
            __html: question.question_content!,
          }}
        />
      </div>
      <div className="flex flex-row">
        <Bookmark />
        <FaRegLightbulb
          onClick={showHint}
          className={cn(
            "w-5 h-5 ml-2 cursor-pointer",
            hintShowed && "text-yellow-600"
          )}
        />
      </div>
    </div>
  );
}
