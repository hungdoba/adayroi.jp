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

// Main registration function
export async function createUser(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const username = formData.get('username') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const rePassword = formData.get('rePassword') as string;

  // Validate the data
  const result = userSignUpSchema.safeParse({
    username,
    email,
    password,
    rePassword,
  });

  if (!result.success) {
    return formErrorToFormState(result.error);
  }

  try {
    const signUpUser: SignUpUser = { username, email, password };

    const existenceCheckResult = await checkUserExistence(signUpUser);
    if (existenceCheckResult !== true)
      return formErrorToFormState(existenceCheckResult);

    const timeNow = getTimestamp();
    const hashedPassword = await hashPassword(password);

    const newUser = await prisma.users.create({
      data: {
        username: username,
        email: email,
        hashed_password: hashedPassword,
        role: 'user',
        created_at: timeNow,
        updated_at: timeNow,
      },
    });

    if (!newUser) {
      return formErrorToFormState(
        'User sign up fail, fail step: create user in database'
      );
    }

    return { status: 'SUCCESS', message: 'Success' };
  } catch (error) {
    console.error('Sign up user fail, detail: ', error);
    return formErrorToFormState(null);
  }
}

// Protected: Update user password
export async function updatePassword(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const userId = await getUserId();
  if (typeof userId === 'string') return formErrorToFormState(userId);

  const currentPassword = formData.get('currentPassword') as string;
  const password = formData.get('newPassword') as string;
  const rePassword = formData.get('rePassword') as string;

  const result = userRePasswordSchema.safeParse({
    password,
    rePassword,
  });
  if (!result.success) {
    return formErrorToFormState(result.error);
  }

  const user = await prisma.users.findFirst({
    where: {
      id: userId,
    },
  });
  if (!user) {
    return formErrorToFormState('User not found');
  }

  // verify password
  const verifyPasswordResult = await verifyPassword(
    currentPassword,
    user.hashed_password
  );
  if (!verifyPasswordResult) {
    return formErrorToFormState('Invalid password');
  }

  try {
    const hashedPassword = await hashPassword(password);

    await prisma.users.update({
      where: { id: userId },
      data: {
        hashed_password: hashedPassword,
      },
    });
    return { status: 'SUCCESS', message: 'Success' };
  } catch (error) {
    console.error('Error during update password:', error);
    return formErrorToFormState(null);
  }
}

// User reset password
export async function resetPassword(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const email = formData.get('email') as string;

  // Validate the data
  const result = emailSchema.safeParse({ email });

  if (!result.success) {
    return formErrorToFormState(result.error);
  }

  try {
    const user = await prisma.users.findFirst({
      where: { email },
    });

    if (!user) {
      return formErrorToFormState('User not found');
    }

    // Generate a unique reset token
    let resetToken = crypto.randomBytes(32).toString('hex');

    // Set an expiration time for the token (1 hour from now)
    const requestedAt = getTimestamp();
    const expiresAt = requestedAt + 3600;

    // Check if there is already a reset token for this user
    const existingReset = await prisma.password_resets.findFirst({
      where: { user_id: user.id },
    });

    // Check if the user has requested a reset within the last minute
    if (existingReset) {
      // If the user has requested a reset within the last minute, return an error
      if (existingReset.requested_at + 60 > requestedAt) {
        return formErrorToFormState(
          'Please wait a minute before requesting another reset'
        );
      } else if (existingReset.expires_at > requestedAt) {
        // If the token is still valid, use the existing token, update requested_at
        resetToken = existingReset.token;
        await prisma.password_resets.update({
          where: { user_id: user.id },
          data: {
            requested_at: requestedAt,
          },
        });
      } else {
        // If the token is expired, update the token and expiration time and requested_at
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
      // If there is no existing reset token, create a new one
      await prisma.password_resets.create({
        data: {
          user_id: user.id,
          token: resetToken,
          expires_at: expiresAt,
          requested_at: requestedAt,
        },
      });
    }

    // TODO: Send an email to the user with a link containing the reset token
    const resetLink = `${process.env.NEXT_PUBLIC_DOMAIN}/reset-password?token=${resetToken}`;
    const sendMailResult = await sendMail(
      email,
      'Password Reset Request',
      `You requested a password reset. Click the link to reset your password: ${resetLink}`,
      `You requested a password reset. Click the link to reset your password: <a href="${resetLink}">${resetLink}</a>`
    );

    if (sendMailResult !== true) {
      return formErrorToFormState(sendMailResult);
    }
    return { status: 'SUCCESS', message: 'Password reset email sent' };
  } catch (error) {
    console.error('Error during reset password:', error);
    return formErrorToFormState(null);
  }
}

// Update reset password
export async function updateResetPassword(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const token = formData.get('token') as string;
  const password = formData.get('newPassword') as string;
  const rePassword = formData.get('confirmPassword') as string;

  // Validate the data
  const result = userRePasswordSchema.safeParse({
    password,
    rePassword,
  });

  if (!result.success) {
    return formErrorToFormState(result.error);
  }

  try {
    const reset = await prisma.password_resets.findFirst({
      where: { token },
    });

    if (!reset) {
      return formErrorToFormState('Invalid reset token');
    }

    if (reset.expires_at < getTimestamp()) {
      return formErrorToFormState('Reset token expired');
    }

    const hashedPassword = await hashPassword(password);

    await prisma.users.update({
      where: { id: reset.user_id },
      data: {
        hashed_password: hashedPassword,
      },
    });

    await prisma.password_resets.delete({
      where: { token },
    });

    return { status: 'SUCCESS', message: 'Password reset successful' };
  } catch (error) {
    console.error('Error during update reset password:', error);
    return formErrorToFormState(null);
  }
}

// Utils
const checkUserExistence = async ({
  username,
  email,
}: SignUpUser): Promise<string | true> => {
  const existingUser = await prisma.users.findFirst({
    where: {
      OR: [{ username }, { email }],
    },
  });

  if (existingUser) {
    if (existingUser.username === username) return 'Username already exists.';
    if (existingUser.email === email) return 'Email already exists.';
  }

  return true;
};
