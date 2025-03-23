import * as React from 'react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Session } from 'next-auth';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

interface Props {
  session: Session | null;
}

export function SelectLocale({ session }: Props) {
  const t = useTranslations('Navbar');
  return (
    <Select>
      <SelectTrigger className="ring-0 border-0 focus-visible:ring-offset-0 focus-visible:ring-0">
        <SelectValue placeholder={session?.user.name} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="changePassword">{t('changePassword')}</SelectItem>
          {session?.user?.role === 'admin' && (
            <SelectItem value="admin">{t('admin')}</SelectItem>
          )}
          <SelectItem value="signOut">{t('signOut')}</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
