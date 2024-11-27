import { getServerSession, User } from 'next-auth';
import { authOptions } from './auth';

export async function getUserId(): Promise<number | string> {
  const session = await getServerSession(authOptions);

  if (!session) return 'Unauthorized';
  if (!session.user) return 'User not found';
  if (!session.user.id) return 'User id not found';
  return Number(session.user.id);
}

export async function adminInfo(): Promise<false | User> {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || !session.user.role) {
      return false;
    }
    if (session.user.role !== 'admin') {
      return false;
    }
    return session.user;
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
}
