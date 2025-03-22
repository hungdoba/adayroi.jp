import { Anchor } from 'lucide-react';

export default function loading() {
  const elements = Array.from({ length: 5 }, (_, index) => index + 1);
  return (
    <div className="container mx-auto w-full my-4 md:max-w-5xl animate-pulse">
      <div className="flex flex-col md:flex-row mx-4 md:mx-8">
        <div className="hidden md:block w-full md:w-1/4">
          <div className={`md:mr-8 md:top-4`}>
            <div
              className={`overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 md:relative justify-center items-center w-full h-full max-h-full bg-white bg-opacity-95 dark:bg-slate-800 dark:bg-opacity-95`}
            >
              <div className="relative p-4 md:p-0 w-full max-w-2xl max-h-full">
                {/* Modal content */}
                <div className="relative bg-white rounded-lg dark:bg-gray-700 md:bg-transparent md:dark:bg-transparent">
                  {/* Modal header */}
                  <div className="flex items-center justify-between pt-2 pb-6 border-b rounded-t dark:border-gray-600">
                    <div className="w-full flex flex-row items-center">
                      <div className="h-4 w-full bg-gray-200 rounded-full dark:bg-gray-700 mr-4"></div>
                      <div className="mr-2 text-gray-500">
                        <Anchor />
                      </div>
                    </div>
                  </div>

                  {/* Table of Contents */}
                  <article className="p-4 md:p-0 md:pt-10 space-y-4">
                    {elements.map((element) => {
                      return (
                        <div key={element}>
                          <div className="h-2 rounded-full w-full mb-4"></div>
                          <div className="h-2 rounded-full w-1/2 md:w-full mb-4"></div>
                          <div className="h-2 rounded-full w-1/2 mb-8"></div>
                        </div>
                      );
                    })}
                  </article>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main article */}
        <div className="w-full md:w-3/4">
          <h1 className="text-4xl font-bold my-4">
            <div className="h-4 md:h-8 bg-gray-200 rounded-full dark:bg-gray-700 w-full md:w-3/4 mb-4"></div>
            <div className="md:hidden h-4 md:h-8 bg-gray-200 rounded-full dark:bg-gray-700 w-3/4 mb-4"></div>
          </h1>
          <div className="flex items-center justify-center h-72 md:h-96 mb-4 bg-gray-300 rounded dark:bg-gray-700">
            <svg
              className="w-10 h-10 text-gray-200 dark:text-gray-600"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 16 20"
            >
              <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
              <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
            </svg>
          </div>
          {elements.map((element) => (
            <div key={element} className="mb-8">
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-4"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-4"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-4"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-1/2 md:w-full mb-8"></div>
              <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-2/3 mb-4"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
