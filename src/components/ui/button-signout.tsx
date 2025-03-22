'use client';
import { cn } from '@/utils/cn';
import { signOut } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { ClassNameProps } from '@/types/ClassName';

export function ButtonSignOut({ className }: ClassNameProps) {
  const t = useTranslations('Navbar');
  return (
    <button
      className={cn(
        'w-full block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white rounded-lg',
        className
      )}
      type="button"
      onClick={() => signOut()}
    >
      {t('signOut')}
    </button>
  );
}
