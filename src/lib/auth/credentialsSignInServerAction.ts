'use server';

import { signIn } from '@/src/lib/auth/authConfig';

export const credentialsSignIn = async (email: string, password: string) => {
  try {
    await signIn('credentials', {
      redirect: false,
      email,
      password,
    });
    return { success: true };
  } catch (err) {
    return { success: false, error: 'Failed to sign in' };
  }
};

/*
export const credentialsSignIn = async (email: string, password: string) => {
  console.log('credentials::::', email, password);

  try {
    await signIn('credentials', { redirect: true, email, password });
  } catch (error) {
    console.error(22222, error);
  }
};
*/
