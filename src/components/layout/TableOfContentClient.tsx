'use client';
import { Link } from '@/i18n/routing';
import { cn } from '@/utils/cn';
import { useTranslations } from 'next-intl';
import { ReactNode, useState } from 'react';
import { FiAnchor, FiChevronUp, FiEdit, FiList } from 'react-icons/fi';
import ButtonScrollTop from '../common/ButtonScrollTop';

interface Props {
  children: ReactNode;
  slug: string;
  isAdmin: boolean;
}

export default function TableOfContentClient({
  children,
  slug,
  isAdmin,
}: Props) {
  const t = useTranslations('FullPost');

  const [pin, setPin] = useState(false);
  const [visible, setVisible] = useState(false);

  function handleShowTableOfContent(): void {
    setVisible(!visible);
    setPin(!pin);
  }

  return (
    <div className={cn('md:mr-8 md:top-4', pin ? 'md:sticky' : 'md:static')}>
      {/* Button show table of content and scroll to top */}
      <ButtonScrollTop className="bottom-10" />
      <div className="z-50 fixed right-2 bottom-2 hover:cursor-pointer">
        <div className="p-2 md:p-4" onClick={handleShowTableOfContent}>
          <FiList />
        </div>
      </div>

      {/* Table of content */}
      <div
        className={cn(
          'z-40 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 md:relative justify-center items-center w-full h-full max-h-full bg-white bg-opacity-95 dark:bg-slate-800 dark:bg-opacity-95 md:bg-transparent md:dark:bg-transparent',
          !visible && 'hidden md:block'
        )}
      >
        <div className="relative p-4 md:p-0 w-full max-w-2xl max-h-full">
          {/* Modal content */}
          <div className="relative rounded-lg">
            {/* Modal header */}
            <div className="flex items-center justify-between p-4 md:p-0 md:pb-4 border-b rounded-t dark:border-gray-600">
              <div className="w-full flex flex-row items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {t('tableOfContents')}
                </h3>
                <div className="flex flex-row items-center">
                  {/* Admin: edit this post */}
                  {isAdmin && (
                    <Link
                      href={`/admin/update/${slug}`}
                      className="w-full text-gray-400 dark:text-gray-500"
                    >
                      <FiEdit />
                    </Link>
                  )}
                  <div
                    className={cn(
                      'hidden md:block p-2 hover:cursor-pointer',
                      pin
                        ? 'text-blue-500 dark:text-blue-600'
                        : 'text-gray-400 dark:text-gray-500'
                    )}
                    onClick={() => setPin(!pin)}
                  >
                    <FiAnchor />
                  </div>
                </div>
              </div>

              {/* Button Close */}
              <button
                type="button"
                className="md:hidden text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => setVisible(!visible)}
                data-modal-hide="default-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
              </button>
            </div>

            {/* Table of Contents */}
            <article
              className="p-4 md:p-0 md:pt-4 space-y-4"
              onClick={() => setVisible(false)}
            >
              {children}
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}
