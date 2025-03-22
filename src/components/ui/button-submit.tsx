'use client';

import { ClassNameProps } from '@/types/ClassName';
import { cn } from '@/utils/cn';
import { Loader } from 'lucide-react';
import { useFormStatus } from 'react-dom';

interface Props extends ClassNameProps {
  label: string;
  disabled?: boolean;
}

// used in form
export function ButtonSubmit({ label, disabled, className }: Props) {
  const { pending } = useFormStatus();
  return (
    <button
      className={cn(
        'w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:disabled:bg-blue-300 dark:disabled:hover:bg-blue-500 dark:focus:ring-blue-800 flex items-center justify-center',
        className
      )}
      disabled={disabled || pending}
      type="submit"
    >
      {pending && <Loader />}
      {label}
    </button>
  );
}
