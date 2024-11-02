'use server';

import { signIn } from '@/src/lib/auth/authConfig';
import comparePasswords from './comparePasswordsServerAction';

type EmailSignIn = (
  email: string,
  password?: string,
  dbPassword?: string
) => Promise<string>;

export const handleEmailSignIn: EmailSignIn = async (
  email,
  password,
  dbPassword
) => {
  try {
    const isPasswordsMatched =
      password && dbPassword
        ? await comparePasswords(password, dbPassword)
        : true;

    if (isPasswordsMatched) {
      await signIn('nodemailer', { email, callbackUrl: '/dashboard' });
      return '';
    } else {
      return 'do not match';
    }
  } catch (err) {
    throw err;
  }
};
