import { ReactNode } from 'react';
import { Locale } from '@/i18n/routing';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

type Props = {
  params: Promise<{ locale: Locale }>;
  children: ReactNode;
};

export default async function Home({ params, children }: Props) {
  const { locale } = await params;
  return (
    <div className="md:max-w-screen-lg mx-auto min-h-screen flex flex-col">
      <Navbar locale={locale} />
      <main className="flex-grow flex">{children}</main>
      <Footer />
    </div>
  );
}
