'use client';
import { Session } from 'next-auth';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { ButtonSignOut } from './button-signout';
import { useEffect, useRef, useState } from 'react';
import { ClassNameProps } from '@/types/ClassName';
import { cn } from '@/utils/cn';

interface Props extends ClassNameProps {
  session: Session | null;
}

export default function DropdownUser({ session, className }: Props) {
  const t = useTranslations('Navbar');
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return session ? (
    <>
      <div className={cn('hidden md:block', className)}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
        >
          {session.user?.name || ''}
          <svg
            className="w-2.5 h-2.5 ms-2.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>

        <div
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            'origin-top transition duration-500 z-10 absolute right-0 top-0 mt-6 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600',
            {
              'scale-y-100': isOpen,
              'scale-y-0': !isOpen,
            }
          )}
        >
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-400">
            <li>
              <Link
                href="/user/change/password"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white rounded-lg"
              >
                {t('changePassword')}
              </Link>
            </li>
            {session.user?.role === 'admin' && (
              <li>
                <Link
                  href="/admin"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white rounded-lg"
                >
                  {t('admin')}
                </Link>
              </li>
            )}
          </ul>
          <div className="py-1">
            <ButtonSignOut />
          </div>
        </div>
      </div>
      <div className="md:hidden flex flex-col justify-center items-center text-blue-600 dark:text-blue-500">
        {session.user?.role == 'admin' && (
          <Link href="/admin" className="block">
            {t('admin')}
          </Link>
        )}
        <Link className="block mt-6 md:mt-0" href="/password/change">
          {t('changePassword')}
        </Link>
        <div className="mt-4">
          <ButtonSignOut />
        </div>
      </div>
    </>
  ) : (
    <Link
      className="text-blue-600 dark:text-blue-500  block mt-6 md:mt-0"
      href="/signin"
    >
      {t('signIn')}
    </Link>
  );
}
