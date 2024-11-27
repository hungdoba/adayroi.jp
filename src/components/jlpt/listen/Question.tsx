import Bookmark from '../../common/Bookmark';
import AudioPlayer from '../../ui/AudioPlayer';
import { jlpt_chokai } from '@prisma/client';
import { FaRegLightbulb } from 'react-icons/fa';

interface Props {
  question: jlpt_chokai;
  hintShowed: boolean;
  showHint: () => void;
}

export default function Question({ question, hintShowed, showHint }: Props) {
  return (
    question && (
      <div className="flex flex-row  mb-2">
        <div className="flex flex-row flex-1">
          <h3 className="min-w-6 h-6 px-1 mr-2 flex justify-center align-middle items-center border border-gray-500 rounded">
            {question.question_number}
          </h3>
          <AudioPlayer
            src={`https://res.cloudinary.com/dxrsjkj8m/video/upload/v1716523175/asiatips/audio/${question.year}-${question.month}-${question.mondai_number}-${question.question_number}.mp3`}
          />
        </div>
        <div className="flex flex-row">
          <Bookmark />
          <FaRegLightbulb
            onClick={showHint}
            className={`w-5 h-5 ml-2 cursor-pointer ${
              hintShowed ? 'text-yellow-600' : ''
            }`}
          />
        </div>
      </div>
    )
  );
}
