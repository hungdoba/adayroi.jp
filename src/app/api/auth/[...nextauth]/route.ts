import { authOptions } from '@/utils/auth';
import NextAuth, { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface User extends DefaultUser {
    role: string;
  }

  interface JWT {
    id: string;
    role: string;
  }

  interface Session extends DefaultSession {
    user: {
      id: string;
      role: string;
    } & DefaultSession['user'];
  }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
