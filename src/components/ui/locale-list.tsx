'use client';
import Dropdown from './dropdown';
import { MenuItem } from '@/types/MenuItem';
import { useLocale, useTranslations } from 'next-intl';
import { Locale, routing } from '@/i18n/routing';

interface Props {
  onLocaleChange: (locale: Locale) => void;
  isPending?: boolean;
}

export default function LocaleList({
  onLocaleChange,
  isPending = false,
}: Props) {
  const t = useTranslations('LocaleSwitcher');
  const locale = useLocale();

  const localeItems: MenuItem[] = routing.locales.map((locale: Locale) => ({
    label: t('locale', { locale }),
    value: locale,
    icon: t('icon', { locale }),
  }));

  function handleSwitchLocale(value: Locale): void {
    onLocaleChange(value);
  }

  return (
    <Dropdown
      menuItems={localeItems}
      onSelect={handleSwitchLocale}
      defaultSelected={locale}
      isPending={isPending}
    />
  );
}
