import { Locale } from '@/i18n/routing';
import NavbarClient from './NavbarClient';
import { getServerSession } from 'next-auth';
import { getCategoriesCache } from '@/actions/category';
import { authOptions } from '@/utils/auth';
import { post_category } from '@prisma/client';

type Props = {
  locale: Locale;
};

export default async function Navbar({ locale }: Props) {
  const session = await getServerSession(authOptions);
  const categories = await getCategoriesCache(locale);

  const menuItems = categories.map((category: post_category) => ({
    href: category.slug,
    label: category.title,
  }));

  return <NavbarClient session={session} menuItems={menuItems} />;
}
