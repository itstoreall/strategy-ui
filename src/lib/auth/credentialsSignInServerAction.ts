'use server';

import { signIn } from '@/src/lib/auth/authConfig';
import { CredentialsSignin } from 'next-auth';

export const credentialsSignIn = async (email: string, password: string) => {
  try {
    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });
    if (res) {
      return { success: true };
    } else {
      return { success: false };
    }
  } catch (err) {
    return { error: (err as CredentialsSignin).type };
  }
};
