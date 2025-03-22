import { PostInfo } from '@/types/Post';
import { toast } from 'sonner';

interface PostInfoEditorProps {
  mode: 'create' | 'update';
  postInfo: PostInfo;
  postContent: string;
  onChange: (postInfo: PostInfo) => void;
  onSave: () => void;
}

const PostInfoEditor: React.FC<PostInfoEditorProps> = ({
  mode,
  postInfo,
  postContent,
  onChange,
  onSave,
}) => {
  const { title, brief, tableOfContent } = postInfo;

  const handleTitleChange = (title: string) => {
    onChange({ ...postInfo, title });
  };

  const handleBriefChange = (brief: string) => {
    onChange({ ...postInfo, brief });
  };

  const handleTableOfContentChange = (tableOfContent: string) => {
    onChange({ ...postInfo, tableOfContent });
  };

  const createTableOfContent = async () => {
    const headings = postContent.match(/^(#+)(.*)/gm);

    if (!headings || headings.length === 0) {
      toast.error('No headings found.');
      return '';
    }

    let toc = '';
    headings.forEach((heading: string) => {
      const matchResult = heading.match(/^(#+)/m);
      if (matchResult) {
        const level = matchResult[0].length;
        const text = heading.replace(/^(#+)\s*/, '').trim();
        const anchor = text
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[!\"$%&'()*+,\./:;<=>?@[\\\]^`{|}~]/g, '');
        toc += `${'  '.repeat(level - 1)}- [${text}](#${anchor})\n`;
      }
    });

    handleTableOfContentChange(toc);
  };

  return (
    <form className="mx-auto md:mr-4">
      <div className="relative w-full mb-5 group">
        <input
          name="floating_title"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
          required={true}
        />
        <label
          htmlFor="floating_title"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Title
        </label>
      </div>

      <div className="relative w-full mb-5 group">
        <textarea
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={brief}
          onChange={(e) => handleBriefChange(e.target.value)}
          placeholder="Brief"
        ></textarea>
      </div>

      <div className="relative w-full mb-5 group">
        <textarea
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={tableOfContent}
          onChange={(e) => handleTableOfContentChange(e.target.value)}
          placeholder="Table of content"
        ></textarea>
      </div>

      <button
        type="button"
        onClick={() => createTableOfContent()}
        className="w-full py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      >
        Create Table of Content
      </button>

      <button
        type="button"
        onClick={onSave}
        className="w-full py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      >
        {`${mode.toLocaleUpperCase()} POST`}
      </button>
    </form>
  );
};

export default PostInfoEditor;
