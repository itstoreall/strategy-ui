'use server';

import { auth } from '@/src/lib/auth/authConfig';

export const getSessionData = async () => {
  const session = await auth();
  if (session) {
    return { userId: session.user?.id };
  }
};
