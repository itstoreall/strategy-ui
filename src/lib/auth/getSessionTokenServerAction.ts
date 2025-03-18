'use server';

import { Session } from 'next-auth';
import { auth } from '@/src/lib/auth/authConfig';

export const getSessionToken = async () => {
  const session = await auth();
  if (session) {
    return (session as Session & { currentToken: string }).currentToken;
  }
};
