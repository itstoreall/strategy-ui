'use server';

import { signOut } from '@/src/lib/auth/authConfig';

export const handleSignOut = async () => {
  try {
    console.log(1, 'sign out');
    await signOut();
  } catch (error) {
    throw error;
  }
};
