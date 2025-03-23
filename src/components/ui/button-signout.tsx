'use client';
import { signOut } from 'next-auth/react';
import { useTranslations } from 'next-intl';

export function ButtonSignOut() {
  const t = useTranslations('Navbar');
  return (
    <button type="button" onClick={() => signOut()}>
      {t('signOut')}
    </button>
  );
}
