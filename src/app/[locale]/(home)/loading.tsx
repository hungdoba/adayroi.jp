export default function loading() {
  const elements = Array.from({ length: 5 }, (_, index) => index + 1);
  return (
    <div className="container mx-auto w-full mt-4 md:max-w-5xl animate-pulse">
      <div className="mx-4 md:mx-8">
        <div className="space-y-2 pb-8 md:pt-6 md:space-y-5">
          <div className="text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-4xl md:leading-14">
            <div className="h-4 md:h-8 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
          </div>
          <div className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            <div className="h-2 md:h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-full md:w-1/2 mb-4"></div>
            <div className="md:hidden h-2 md:h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-full md:w-1/2 mb-4"></div>
          </div>
        </div>
        <hr />
        <div className="divide-y divide-gray-300 dark:divide-gray-600">
          {elements.map((element) => (
            <div key={element} className="relative">
              <div className="flex items-stretch w-full my-2 p-2 md:p-6">
                <div className="w-1/3 max-h-fit bg-black">
                  <div className="h-full flex items-center justify-center bg-gray-300 rounded dark:bg-gray-700">
                    <svg
                      className="w-5 md:w-10 h-5 md:h-10 text-gray-200 dark:text-gray-600"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 18"
                    >
                      <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                    </svg>
                  </div>
                </div>
                <div className="flex flex-col justify-around w-2/3 pl-6">
                  <h1 className="hidden md:block mb-2 md:text-xl md:font-bold">
                    <div className="h-2 md:h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-4"></div>
                    <div className="h-2 md:h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                  </h1>
                  <div className="font-normal">
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-4"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-4"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-4"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-1/2 md:w-full mb-4"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-1/2 mb-4"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
