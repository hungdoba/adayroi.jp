import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
// import withBundleAnalyzer from "@next/bundle-analyzer";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '**',
      },
    ],
  },
  // experimental: {
  //   mdxRs: true,
  //   webpackMemoryOptimizations: true,
  // },
  // bundlePagesRouterDependencies: true,
  // serverExternalPackages: ["easymde"],
};

// const bundleAnalyzerConfig = withBundleAnalyzer({
//   enabled: process.env.ANALYZE === "true",
// });

export default withNextIntl(nextConfig);
// export default withNextIntl(bundleAnalyzerConfig(nextConfig));
