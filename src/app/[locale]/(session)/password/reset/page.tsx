'use client';

import { useEffect } from 'react';
import { useFormState } from 'react-dom';
import { redirect } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { EMPTY_FORM_STATE } from '@/types/FormState';
import { updateResetPassword } from '@/actions/session';
import { toast } from 'sonner';
import { ButtonSubmit } from '@/components/ui/button-submit';

export default function SignInPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  if (!token) {
    redirect('/signin');
  }

  const [formState, formAction] = useFormState(
    updateResetPassword,
    EMPTY_FORM_STATE
  );

  useEffect(() => {
    if (formState.message) {
      if (formState.status === 'ERROR') {
        toast.error(formState.message);
      } else {
        toast.success(formState.message);
        redirect('/signin');
      }
    }
  }, [formState.status, formState.message]);

  return (
    <form className="w-96 mx-auto" action={formAction}>
      <input type="hidden" name="token" readOnly value={token} />
      <div className="mb-5">
        <label
          htmlFor="newPassword"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your new password
        </label>
        <input
          type="password"
          id="newPassword"
          name="newPassword"
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          placeholder="at least 8 characters"
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="confirmPassword"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Confirm new password
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          placeholder="at least 8 characters"
        />
      </div>
      <ButtonSubmit label="Update" />
    </form>
  );
}
