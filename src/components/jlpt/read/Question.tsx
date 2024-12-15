import Editor from '@/components/common/Editor';
import Bookmark from '../../common/Bookmark';
import { jlpt_question } from '@prisma/client';
import { FaRegLightbulb } from 'react-icons/fa';
import { updateQuestionContent } from '@/actions/jlpt';
import toast from 'react-hot-toast';

interface Props {
  question: jlpt_question;
  hintShowed: boolean;
  showHint: () => void;
}

export default function Question({ question, hintShowed, showHint }: Props) {
  async function handleSave(content: string) {
    const formData = new FormData();
    formData.append('id', String(question.id));
    formData.append('content', content);

    const result = await updateQuestionContent(formData);
    toast.success('Question content updated');
    // setContentUpdated(result);
  }

  return (
    <div className="flex flex-row justify-between mb-2 w-full">
      <div className="flex flex-row w-full">
        <h3 className="min-w-6 h-6 px-1 mr-2 flex justify-center align-middle items-center border border-gray-500 rounded">
          {question.question_number}
        </h3>

        <Editor onSave={handleSave} content={question.question_content!} />
        {/* <h3
          dangerouslySetInnerHTML={{
            __html: question.question_content!,
          }}
        /> */}
      </div>
      <div className="flex flex-row">
        <Bookmark />
        <FaRegLightbulb
          onClick={showHint}
          className={`w-4 h-4 ml-2 cursor-pointer ${
            hintShowed ? 'text-yellow-600' : ''
          }`}
        />
      </div>
    </div>
  );
}
