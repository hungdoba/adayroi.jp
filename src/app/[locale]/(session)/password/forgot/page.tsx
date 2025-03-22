'use client';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useActionState, useEffect } from 'react';
import { resetPassword } from '@/actions/session';
import { EMPTY_FORM_STATE } from '@/types/FormState';
import { toast } from 'sonner';
import { ButtonSubmit } from '@/components/ui/button-submit';

export default function ForgotPassword() {
  const t = useTranslations('Forgot');
  const [formState, formAction] = useActionState(
    resetPassword,
    EMPTY_FORM_STATE
  );

  useEffect(() => {
    if (formState.message) {
      if (formState.status === 'ERROR') {
        toast.error(formState.message);
      } else {
        toast.success(formState.message);
      }
    }
  }, [formState.status, formState.message]);

  return (
    <div className="w-96 p-4 flex flex-col">
      <form action={formAction} className="w-full mx-auto">
        <div className="w-full mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            {t('email')}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder={t('emailPlaceholder')}
          />
        </div>

        <div className="flex justify-end mb-5">
          <label
            htmlFor="terms"
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            {t('or')}
            {` `}
            <Link
              href="/signin"
              className="font-medium text-primary-600 hover:underline dark:text-primary-500 text-blue-600 dark:text-blue-500"
            >
              {t('signIn')}
            </Link>
          </label>
        </div>

        <ButtonSubmit label={t('request')} />
      </form>
    </div>
  );
}
