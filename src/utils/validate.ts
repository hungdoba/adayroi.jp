import { z } from 'zod';

export const userPasswordSchema = z.object({
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .regex(/^\S*$/, 'Password cannot contain spaces'),
});

export const userRePasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .regex(/^\S*$/, 'Password cannot contain spaces'),
    rePassword: z
      .string()
      .min(8, 'Re-entered password must be at least 8 characters long')
      .regex(/^\S*$/, 'Re-entered password cannot contain spaces'),
  })
  .refine((data) => data.password === data.rePassword, {
    message: 'Passwords must match',
    path: ['rePassword'],
  });

export const userSignInSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters long')
    .regex(/^\S*$/, 'Username cannot contain spaces'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .regex(/^\S*$/, 'Password cannot contain spaces'),
});

export const usernameSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters long')
    .regex(/^[A-Za-z0-9]+$/, 'Username can only contain letters and numbers'),
});

export const emailSchema = z.object({
  email: z.string().email('Invalid email format'),
});

export const userSignUpSchema = z
  .object({
    username: z
      .string()
      .min(3, 'Username must be at least 3 characters long')
      .regex(/^[A-Za-z0-9]+$/, 'Username can only contain letters and numbers'),
    email: z.string().email('Invalid email format'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .regex(/^\S*$/, 'Password cannot contain spaces'),
    rePassword: z
      .string()
      .min(8, 'Re-entered password must be at least 8 characters long')
      .regex(/^\S*$/, 'Re-entered password cannot contain spaces'),
  })
  .refine((data) => data.password === data.rePassword, {
    message: 'Passwords must match',
    path: ['rePassword'],
  });
