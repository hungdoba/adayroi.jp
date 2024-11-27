import prisma from '@/libs/prisma';
import { verifyPassword } from '@/utils/crypto';
import { userSignInSchema } from '@/utils/validate';
import { NextAuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/signin',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: {},
        password: {},
      },

      async authorize(credentials) {
        // verify username format
        const username = credentials?.username as string;
        const password = credentials?.password as string;

        const result = userSignInSchema.safeParse({
          username,
          password,
        });
        if (!result.success) {
          console.log(username, result.error);
          return null;
        }

        // check username exist in database
        const user = await prisma.users.findFirst({
          where: {
            username: username,
          },
        });
        if (!user) {
          return null;
        }

        const verifyPasswordResult = await verifyPassword(
          password,
          user.hashed_password
        );
        if (!verifyPasswordResult) {
          return null;
        }

        // convert to user type of next-auth
        const mappedUser: User = {
          id: String(user.id),
          name: user.username,
          email: user.email,
          role: user.role,
        };

        return mappedUser;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }

      return session;
    },
  },
};
