'use client';

import { useActionState, useEffect } from 'react';

import { updatePassword } from '@/actions/session';
import { EMPTY_FORM_STATE } from '@/types/FormState';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { ButtonSubmit } from '@/components/ui/button-submit';

export default function ChangePassword() {
  const t = useTranslations('ChangePasswordPage');
  const [formState, formAction] = useActionState(
    updatePassword,
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
    <form className="w-96 mx-auto" action={formAction}>
      <div className="mb-5">
        <label
          htmlFor="currentPassword"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {t('currentPassword')}
        </label>
        <input
          type="password"
          id="currentPassword"
          name="currentPassword"
          required
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          placeholder={t('currentPasswordPlaceholder')}
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="newPassword"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {t('newPassword')}
        </label>
        <input
          type="password"
          id="newPassword"
          name="newPassword"
          minLength={8}
          required
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          placeholder={t('newPasswordPlaceholder')}
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
      <div className="mb-4">
        <ButtonSubmit label={t('request')} />
      </div>
    </form>
  );
}
