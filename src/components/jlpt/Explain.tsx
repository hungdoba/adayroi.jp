import { AutosizeTextarea } from '../ui/AutosizeTextarea';

interface Props {
  content: string | null;
}

export default function Explain({ content }: Props) {
  return (
    <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
      <div className={`px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800`}>
        <AutosizeTextarea
          readOnly
          className="w-full px-0 text-sm text-gray-900 bg-white focus:outline-none dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
          value={content ?? ''}
        />
      </div>
    </div>
  );
}
