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
    <div className="max-w-screen-lg mx-auto">
      <Navbar locale={locale} />
      <main className="flex-grow flex items-center justify-center">
        {children}
      </main>
      <Footer />
    </div>
  );
}
