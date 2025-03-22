import { routing } from './i18n/routing';
import { NextRequest } from 'next/server';
import { withAuth } from 'next-auth/middleware';
import createMiddleware from 'next-intl/middleware';

// TODO: hard-code category and locale for performance,
// must reconfigure in case of category or locale changes
const intlMiddleware = createMiddleware(routing);

const publicPages = new Set([
  '',
  'signin',
  'signup',
  'gallery',
  'terms',
  'password',
  'unauthorized',
  'rss.xml',
  'news',
  'jlpt',
]);

const authMiddleware = withAuth((req) => intlMiddleware(req));

export default function middleware(req: NextRequest) {
  let pathname = req.nextUrl.pathname;
  const languagePrefix = pathname.split('/')[1];

  // Remove language prefix for easier route handling if matched
  if (['en', 'ja', 'vi'].includes(languagePrefix)) {
    pathname = pathname.replace(`/${languagePrefix}`, '');
  }

  const node = pathname.split('/');
  const isPublicPage = node.length == 1 || publicPages.has(node[1]);

  if (isPublicPage) {
    return intlMiddleware(req);
  } else {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (authMiddleware as any)(req);
  }
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
