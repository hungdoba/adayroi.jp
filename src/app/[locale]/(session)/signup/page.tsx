'use client';

import { useActionState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

import { createUser } from '@/actions/session';
import { EMPTY_FORM_STATE } from '@/types/FormState';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { ButtonSubmit } from '@/components/ui/button-submit';

export default function SignUpPage() {
  const t = useTranslations('SignUpPage');
  const [formState, formAction] = useActionState(createUser, EMPTY_FORM_STATE);
  const searchParams = useSearchParams();
  const ref = searchParams.get('ref');

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
    <form className="w-96 mx-auto" action={formAction}>
      <div className="mb-5">
        <label
          htmlFor="username"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {t('username')}
        </label>
        <input
          type="text"
          id="username"
          name="username"
          minLength={3}
          required
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          placeholder={t('usernamePlaceholder')}
        />
      </div>
      <div className="mb-5">
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
          required
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          placeholder={t('emailPlaceholder')}
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {t('password')}
        </label>
        <input
          type="password"
          id="password"
          name="password"
          minLength={8}
          required
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          placeholder={t('passwordPlaceholder')}
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="repeat-password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {t('confirmPassword')}
        </label>
        <input
          type="password"
          id="repeat-password"
          name="rePassword"
          minLength={8}
          required
          placeholder={t('confirmPasswordPlaceholder')}
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
        />
      </div>
      <input type="hidden" name="ref" value={ref ?? ''} />
      <div className="flex items-start mb-5">
        <div className="flex items-center h-5">
          <input
            id="terms"
            type="checkbox"
            name="termsChecked"
            required
            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
          />
        </div>
        <label
          htmlFor="terms"
          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          {t('agree')}{' '}
          <Link
            href="/terms"
            className="text-blue-600 hover:underline dark:text-blue-500"
          >
            {t('term')}
          </Link>
        </label>
      </div>
      <div className="mb-4">
        <ButtonSubmit label={t('signUp')} />
      </div>
      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
        {t('hadAccount')}{' '}
        <Link
          href="/signin"
          className="font-medium text-primary-600 hover:underline dark:text-primary-500 text-blue-600 dark:text-blue-500"
        >
          {t('signIn')}
        </Link>
      </p>
    </form>
  );
}
