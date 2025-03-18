'use server';

import { Session } from 'next-auth';
import bcrypt from 'bcrypt';
import { auth } from '@/src/lib/auth/authConfig';

export const getSessionToken = async () => {
  const session = await auth();
  if (session) {
    const token = (session as Session & { currentToken: string }).currentToken;
    const hashedToken = await bcrypt.hash(token, 10);
    return hashedToken;
  }
};
