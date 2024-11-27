import { useState } from "react";
import { updateQuestionExplain } from "@/actions/jlpt";

interface Props {
  question_id?: number;
  content: string | null;
  isAdmin: boolean;
}

export default function Explain({ question_id, content, isAdmin }: Props) {
  const [explanation, setExplanation] = useState(content ?? "");
  const [updated, setUpdated] = useState<true | false | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("id", String(question_id));
    formData.append("explanation", explanation);

    const result = await updateQuestionExplain(formData);
    setUpdated(result);
  };

  function handleExplanationChanged(value: string): void {
    setUpdated(null);
    setExplanation(value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
        <div
          className={`px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800 ${
            !isAdmin && "rounded-lg"
          }`}
        >
          <textarea
            rows={4}
            className="w-full px-0 text-sm text-gray-900 bg-white focus:outline-none dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
            placeholder="Write Explanation"
            readOnly={!isAdmin}
            value={explanation}
            onChange={(e) => handleExplanationChanged(e.target.value)}
          />
        </div>
        {isAdmin && (
          <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
            <button
              type="submit"
              className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
            >
              Update
            </button>
            {updated != null &&
              (updated ? (
                <p className="text-green-500">Success</p>
              ) : (
                <p className="text-red-500">Fail</p>
              ))}
          </div>
        )}
      </div>
    </form>
  );
}
