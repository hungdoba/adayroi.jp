import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/:locale/jlpt',
        destination: 'https://jlpt.adayroi.jp/',
        permanent: true,
      },
      {
        source: '/jlpt',
        destination: 'https://jlpt.adayroi.jp/',
        permanent: true,
      },
      {
        source: '/:locale/news',
        destination: 'https://news.adayroi.jp/',
        permanent: true,
      },
      {
        source: '/news',
        destination: 'https://news.adayroi.jp/',
        permanent: true,
      },
      {
        source: '/:locale/ai',
        destination: 'https://comtor.adayroi.jp/',
        permanent: true,
      },
      {
        source: '/ai',
        destination: 'https://comtor.adayroi.jp/',
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '**',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
