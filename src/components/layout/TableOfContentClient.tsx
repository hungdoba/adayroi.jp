'use client';
import { Link } from '@/i18n/routing';
import { cn } from '@/utils/cn';
import { useTranslations } from 'next-intl';
import { ReactNode, useState } from 'react';
import ButtonScrollTop from '../ui/button-scroll-top';
import { Anchor, FilePenLine, List, X } from 'lucide-react';

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

  const [pin, setPin] = useState(true);
  const [visible, setVisible] = useState(false);

  function handleShowTableOfContent(): void {
    setVisible(!visible);
    setPin(!pin);
  }

  return (
    <div className={cn('md:ml-8 md:top-4', pin ? 'md:sticky' : 'md:static')}>
      <ButtonScrollTop className="bottom-10" />
      <div className="z-50 fixed right-2 bottom-2 hover:cursor-pointer">
        <div className="p-2 md:p-4" onClick={handleShowTableOfContent}>
          <List />
        </div>
      </div>

      <div
        className={cn(
          'z-40 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 md:relative justify-center items-center w-full h-full max-h-full bg-white dark:bg-gray-900',
          !visible && 'hidden md:block'
        )}
      >
        <div className="relative p-4 md:p-0 w-full max-w-2xl max-h-full">
          {/* Modal content */}
          <div className="relative rounded-lg">
            {/* Modal header */}
            <div className="flex items-center justify-between pb-4 md:p-0 border-b rounded-t dark:border-gray-600">
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
                      <FilePenLine />
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
                    <Anchor />
                  </div>
                </div>
              </div>
              <div className="md:hidden ml-4">
                <X onClick={() => setVisible(!visible)} />
              </div>
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
