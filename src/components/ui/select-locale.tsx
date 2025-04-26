import * as React from 'react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { Locale, routing, usePathname, useRouter } from '@/i18n/routing';

export function SelectLocale() {
  const t = useTranslations('LocaleSwitcher');
  const locale = useLocale();
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();

  const [isPending, startTransition] = React.useTransition();

  function handleSwitchLocale(locale: Locale): void {
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale }
      );
    });
  }
  return (
    <Select onValueChange={handleSwitchLocale} disabled={isPending}>
      <SelectTrigger className="w-[120px] ring-0 border-0 focus-visible:ring-offset-0 focus-visible:ring-0">
        <SelectValue placeholder={t('locale', { locale })}>
          {isPending ? t('changing') : t('locale', { locale })}
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="bg-white dark:bg-gray-900">
        <SelectGroup>
          <SelectItem value={locale} disabled>
            {t('locale', { locale: locale })}
          </SelectItem>
          {routing.locales.map(
            (loc: Locale) =>
              loc !== locale && (
                <SelectItem
                  key={loc}
                  value={loc}
                  disabled={isPending || loc === locale}
                >
                  {t('locale', { locale: loc })}
                </SelectItem>
              )
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
