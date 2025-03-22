import type { Viewport } from 'next';
import '../globals.css';
import { NextIntlClientProvider } from 'next-intl';
import { Noto_Sans_JP } from 'next/font/google';
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Locale, routing } from '@/i18n/routing';
import { ReactNode } from 'react';
import { Providers } from './providers';
import { Toaster } from 'sonner';

const noto_sans_jp = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-noto-sans-jp',
  display: 'swap',
});

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations('Rss');
  return {
    title: t('title', {
      websiteName:
        process.env.NEXT_PUBLIC_WEBSITE_NAME ?? 'Default Website Name',
    }),
    description: t('description', {
      websiteName:
        process.env.NEXT_PUBLIC_WEBSITE_NAME ?? 'Default Website Name',
    }),
    metadataBase: new URL(process.env.NEXT_PUBLIC_WEBSITE_URL!),
    openGraph: {
      siteName: process.env.NEXT_PUBLIC_WEBSITE_FULL_NAME,
      type: 'website',
      locale: locale,
    },
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
      googleBot: 'index, follow',
    },
    alternates: {
      types: {
        'application/rss+xml': `${process.env.NEXT_PUBLIC_WEBSITE_URL}/${locale}/rss.xml`,
      },
    },
    applicationName: process.env.NEXT_PUBLIC_WEBSITE_NAME,
    appleWebApp: {
      title: process.env.NEXT_PUBLIC_WEBSITE_NAME,
      statusBarStyle: 'default',
      capable: true,
    },
    // TODO add data
    // verification: {
    //   google: 'YOUR_DATA',
    //   yandex: ['YOUR_DATA'],
    //   other: {
    //     'msvalidate.01': ['YOUR_DATA'],
    //     'facebook-domain-verification': ['YOUR_DATA'],
    //   },
    // },
    // TODO add icon
    icons: {
      icon: [
        {
          url: '/favicon.ico',
          type: 'image/x-icon',
        },
        {
          url: '/favicon/favicon-16x16.png',
          sizes: '16x16',
          type: 'image/png',
        },
        {
          url: '/favicon/favicon-32x32.png',
          sizes: '32x32',
          type: 'image/png',
        },
      ],
      shortcut: [
        {
          url: '/favicon.ico',
          type: 'image/x-icon',
        },
      ],
      apple: [
        {
          url: '/favicon/apple-touch-icon.png',
          sizes: '180x180',
          type: 'image/png',
        },
      ],
    },
  };
}

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${noto_sans_jp.className} antialiased scroll-smooth bg-white dark:bg-gray-900`}
      >
        <NextIntlClientProvider messages={messages}>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
        <Toaster />
      </body>
    </html>
  );
}
