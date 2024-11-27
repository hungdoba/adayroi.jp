"use client";
import { jlpt_mondai } from "@prisma/client";
import { useState } from "react";
import { FaRegLightbulb } from "react-icons/fa";
import EditableText from "../../common/EditableText";
import { updateMondaiContent, updateMondaiNote } from "@/actions/jlpt";

interface Props {
  mondai: jlpt_mondai;
  isAdmin: boolean;
}

export default function MondaiContent({ mondai, isAdmin }: Props) {
  const [mondaiContent, setMondaiContent] = useState(mondai.mondai_content);
  const [mondaiTranslate, setMondaiTranslate] = useState(mondai.note ?? "");

  const [contentUpdated, setContentUpdated] = useState<boolean | null>(null);
  const [noteUpdated, setNoteUpdated] = useState<true | false | null>(null);

  const [showHint, setShowHint] = useState(false);

  const handleSubmitChangeContent = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setContentUpdated(null);
    const formData = new FormData();
    formData.append("id", String(mondai.id));
    formData.append("mondai_content", mondaiContent);

    const result = await updateMondaiContent(formData);
    setContentUpdated(result);
  };

  const handleSubmitChangeNote = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setNoteUpdated(null);
    const formData = new FormData();
    formData.append("id", String(mondai.id));
    formData.append("note", mondaiTranslate);

    const result = await updateMondaiNote(formData);
    setNoteUpdated(result);
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between items-center">
        <h2>
          {mondai.mondai_number > 80 && `（${mondai.mondai_number % 10}）`}
        </h2>
        <FaRegLightbulb
          onClick={() => setShowHint(!showHint)}
          className={`w-4 h-4 ml-2 cursor-pointer ${
            showHint ? "text-yellow-600" : ""
          }`}
        />
      </div>

      {/* Mondai's question content */}
      <EditableText
        isAdmin={isAdmin}
        content={mondaiContent}
        setContent={(newContent) => setMondaiContent(newContent)}
        handleSubmitChange={handleSubmitChangeContent}
        updated={contentUpdated}
      />

      {/* Mondai's question translate (note) */}
      {showHint && (
        <div className="rounded border text-gray-400 border-gray-200 dark:border-gray-600 p-4 my-4">
          <EditableText
            isAdmin={isAdmin}
            content={mondaiTranslate}
            setContent={(newContent) => setMondaiTranslate(newContent)}
            handleSubmitChange={handleSubmitChangeNote}
            updated={noteUpdated}
          />
        </div>
      )}
    </div>
  );
}
