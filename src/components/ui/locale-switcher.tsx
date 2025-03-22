'use client';
import LocaleList from './locale-list';
import { useTransition } from 'react';
import { useParams } from 'next/navigation';
import { Locale, usePathname, useRouter } from '@/i18n/routing';

export default function LocaleSwitcher() {
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function handleSwitchLocale(locale: Locale): void {
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: locale }
      );
    });
  }
  return (
    <LocaleList onLocaleChange={handleSwitchLocale} isPending={isPending} />
  );
}
