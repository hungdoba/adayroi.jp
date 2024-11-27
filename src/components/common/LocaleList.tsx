"use client";
import Dropdown from "./Dropdown";
import { MenuItem } from "@/types/MenuItem";
import { useLocale, useTranslations } from "next-intl";
import { Locale, routing } from "@/i18n/routing";
import { ClassNameProps } from "@/types/ClassName";

interface Props extends ClassNameProps {
  onLocaleChange: (locale: Locale) => void;
  isPending?: boolean;
}

export default function LocaleList({
  onLocaleChange,
  isPending = false,
  className,
}: Props) {
  const t = useTranslations("LocaleSwitcher");
  const locale = useLocale();

  const localeItems: MenuItem[] = routing.locales.map((locale: Locale) => ({
    label: t("locale", { locale }),
    value: locale,
    icon: t("icon", { locale }),
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
      className={className}
    />
  );
}
