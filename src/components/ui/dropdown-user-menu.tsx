import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';
import { Session } from 'next-auth';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { ButtonSignOut } from './button-signout';

interface Props {
  session: Session | null;
}

export function DropdownMenuUser({ session }: Props) {
  const t = useTranslations('Navbar');
  return session ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          {session?.user?.name}
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link href={`/user/change/password`}>{t('changePassword')}</Link>
          </DropdownMenuItem>
          {session?.user?.role === 'admin' && (
            <DropdownMenuItem>
              <Link href={`/admin`}>{t('admin')}</Link>
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <ButtonSignOut />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <Button className="pl-0" variant="link">
      <Link href={`/signin`}>{t('signIn')}</Link>
    </Button>
  );
}
