'use server';

import { signIn } from '@/src/lib/auth/authConfig';

type RedirectPath = 'dashboard' | 'settings';

export const handleGoogleSignIn = async (page: RedirectPath) => {
  try {
    await signIn('google', { redirectTo: `/${page}` });
  } catch (error) {
    throw error;
  }
};
