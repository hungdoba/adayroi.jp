import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  const t = useTranslations('Footer');
  return (
    <div className="border-t border-gray-200 dark:border-gray-700">
      <div className="mt-8 flex flex-col items-center">
        <div className="mb-3 flex space-x-4">
          <Link
            aria-label="facebook"
            className="hover:cursor-pointer"
            href={`https://www.facebook.com/asiatips.net`}
            target="_blank"
          ></Link>
          <Facebook />
          <Link
            aria-label="twitter"
            className="hover:cursor-pointer"
            href={`https://x.com/asiatips__net`}
            target="_blank"
          >
            <Twitter />
          </Link>

          <Link
            aria-label="instagram"
            className="hover:cursor-pointer"
            href={`https://www.instagram.com/asiatips_net`}
            target="_blank"
          >
            <Instagram />
          </Link>
        </div>
        <div className="mb-2 flex flex-row items-center space-x-2 text-sm">
          <div>{` • `}</div>
          <div>{process.env.NEXT_PUBLIC_WEBSITE_FULL_NAME}</div>
          <div>{` • `}</div>
          <div>{`© ${new Date().getFullYear()}`}</div>
          <div>{` • `}</div>
          <div>{t('reserved')}</div>
          <div>{` • `}</div>
        </div>
      </div>
    </div>
  );
}
