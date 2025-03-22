'use client';

import { Link } from '@/i18n/routing';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { ButtonSubmit } from '@/components/ui/button-submit';

export default function SignInPage() {
  const t = useTranslations('SignInPage');
  const router = useRouter();
  const locale = useLocale();
  const [error, setError] = useState<string>();
  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (error) setError(undefined);

    const formData = new FormData(event.currentTarget);
    signIn('credentials', {
      username: formData.get('username'),
      password: formData.get('password'),
      redirect: false,
    }).then((result) => {
      if (result?.error) {
        toast.error(t('error'));
      } else {
        const urlParams = new URLSearchParams(window.location.search);
        const callbackUrl = urlParams.get('callbackUrl');
        if (callbackUrl) {
          router.push(decodeURIComponent(callbackUrl));
        } else {
          router.push('/' + locale);
        }
      }
    });
  }

  return (
    <form
      className="w-96 mx-auto"
      action="/api/auth/callback/credentials"
      method="post"
      onSubmit={onSubmit}
    >
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
          className="dark:read-only:text-gray-400 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          placeholder={t('usernamePlaceholder')}
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
          className="dark:read-only:text-gray-400 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          placeholder={t('passwordPlaceholder')}
        />
      </div>
      <div className="flex justify-end mb-5">
        <Link
          href="/password/forgot"
          className="text-sm text-blue-600 hover:underline dark:text-blue-500"
        >
          {t('forgot')}
        </Link>
      </div>
      <div className="mb-4">
        <ButtonSubmit label={t('signIn')} />
      </div>
      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
        {t('signUpQuestion')}
        {` `}
        <Link
          href="/signup"
          className="font-medium text-primary-600 hover:underline dark:text-primary-500 text-blue-600 dark:text-blue-500"
        >
          {t('signUp')}
        </Link>
      </p>
    </form>
  );
}
