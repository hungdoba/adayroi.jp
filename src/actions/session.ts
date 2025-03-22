'use server';

import crypto from 'crypto';
import { getTimestamp } from '@/utils/time';
import { getUserId } from '@/utils/session';
import { FormState } from '@/types/FormState';
import { formErrorToFormState } from '@/utils/form';
import { hashPassword, verifyPassword } from '@/utils/crypto';
import {
  emailSchema,
  userSignUpSchema,
  userRePasswordSchema,
} from '@/utils/validate';
import prisma from '@/libs/prisma';
import { SignUpUser } from '@/types/User';
import { sendMail } from './mail';

export async function createUser(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const username = formData.get('username') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const rePassword = formData.get('rePassword') as string;

  const validation = userSignUpSchema.safeParse({
    username,
    email,
    password,
    rePassword,
  });
  if (!validation.success) return formErrorToFormState(validation.error);

  try {
    const signUpUser: SignUpUser = { username, email, password };
    const existenceCheck = await checkUserExistence(signUpUser);
    if (existenceCheck !== true) return formErrorToFormState(existenceCheck);

    const hashedPassword = await hashPassword(password);
    const timeNow = getTimestamp();

    const newUser = await prisma.users.create({
      data: {
        username,
        email,
        hashed_password: hashedPassword,
        role: 'user',
        created_at: timeNow,
        updated_at: timeNow,
      },
    });

    if (!newUser) {
      return formErrorToFormState('Failed to create user in database');
    }

    return { status: 'SUCCESS', message: 'Success' };
  } catch (error) {
    console.error('Error during user sign-up:', error);
    return formErrorToFormState(null);
  }
}

export async function updatePassword(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const userId = await getUserId();
  if (typeof userId === 'string') return formErrorToFormState(userId);

  const currentPassword = formData.get('currentPassword') as string;
  const newPassword = formData.get('newPassword') as string;
  const rePassword = formData.get('rePassword') as string;

  const validation = userRePasswordSchema.safeParse({
    password: newPassword,
    rePassword,
  });
  if (!validation.success) return formErrorToFormState(validation.error);

  const user = await prisma.users.findFirst({ where: { id: userId } });
  if (!user) return formErrorToFormState('User not found');

  const isPasswordValid = await verifyPassword(
    currentPassword,
    user.hashed_password
  );
  if (!isPasswordValid) return formErrorToFormState('Invalid password');

  try {
    const hashedPassword = await hashPassword(newPassword);
    await prisma.users.update({
      where: { id: userId },
      data: { hashed_password: hashedPassword },
    });
    return { status: 'SUCCESS', message: 'Password updated successfully' };
  } catch (error) {
    console.error('Error during password update:', error);
    return formErrorToFormState(null);
  }
}

export async function resetPassword(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const email = formData.get('email') as string;

  const validation = emailSchema.safeParse({ email });
  if (!validation.success) return formErrorToFormState(validation.error);

  try {
    const user = await prisma.users.findFirst({ where: { email } });
    if (!user) return formErrorToFormState('User not found');

    const resetToken = crypto.randomBytes(32).toString('hex');
    const requestedAt = getTimestamp();
    const expiresAt = requestedAt + 3600;

    const existingReset = await prisma.password_resets.findFirst({
      where: { user_id: user.id },
    });

    if (existingReset) {
      if (existingReset.requested_at + 60 > requestedAt) {
        return formErrorToFormState(
          'Please wait a minute before requesting another reset'
        );
      } else if (existingReset.expires_at > requestedAt) {
        await prisma.password_resets.update({
          where: { user_id: user.id },
          data: { requested_at: requestedAt },
        });
      } else {
        await prisma.password_resets.update({
          where: { user_id: user.id },
          data: {
            token: resetToken,
            expires_at: expiresAt,
            requested_at: requestedAt,
          },
        });
      }
    } else {
      await prisma.password_resets.create({
        data: {
          user_id: user.id,
          token: resetToken,
          expires_at: expiresAt,
          requested_at: requestedAt,
        },
      });
    }

    const resetLink = `${process.env.NEXT_PUBLIC_DOMAIN}/reset-password?token=${resetToken}`;
    const emailResult = await sendMail(
      email,
      'Password Reset Request',
      `Click the link to reset your password: ${resetLink}`,
      `<a href="${resetLink}">${resetLink}</a>`
    );

    if (emailResult !== true) return formErrorToFormState(emailResult);

    return { status: 'SUCCESS', message: 'Password reset email sent' };
  } catch (error) {
    console.error('Error during password reset:', error);
    return formErrorToFormState(null);
  }
}

export async function updateResetPassword(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const token = formData.get('token') as string;
  const newPassword = formData.get('newPassword') as string;
  const confirmPassword = formData.get('confirmPassword') as string;

  const validation = userRePasswordSchema.safeParse({
    password: newPassword,
    rePassword: confirmPassword,
  });
  if (!validation.success) return formErrorToFormState(validation.error);

  try {
    const reset = await prisma.password_resets.findFirst({ where: { token } });
    if (!reset) return formErrorToFormState('Invalid reset token');
    if (reset.expires_at < getTimestamp())
      return formErrorToFormState('Reset token expired');

    const hashedPassword = await hashPassword(newPassword);
    await prisma.users.update({
      where: { id: reset.user_id },
      data: { hashed_password: hashedPassword },
    });

    await prisma.password_resets.delete({ where: { token } });

    return { status: 'SUCCESS', message: 'Password reset successful' };
  } catch (error) {
    console.error('Error during password reset update:', error);
    return formErrorToFormState(null);
  }
}

const checkUserExistence = async ({
  username,
  email,
}: SignUpUser): Promise<string | true> => {
  const existingUser = await prisma.users.findFirst({
    where: { OR: [{ username }, { email }] },
  });

  if (existingUser) {
    if (existingUser.username === username) return 'Username already exists.';
    if (existingUser.email === email) return 'Email already exists.';
  }

  return true;
};
