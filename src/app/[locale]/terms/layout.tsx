import React, { ReactNode } from 'react';
import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import { Locale } from '@/i18n/routing';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_WEBSITE_FULL_NAME,
  description: 'Terms of Service',
};

type Props = {
  params: Promise<{ locale: Locale }>;
  children: ReactNode;
};

export default async function Layout({ params, children }: Props) {
  const { locale } = await params;
  return (
    <div className="max-w-screen-lg min-h-screen mx-auto flex flex-col">
      <header>
        <Navbar locale={locale} />
      </header>
      <main className="mt-16 flex-grow flex items-center justify-center">
        {children}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
