'use server';

import { prisma } from '@/src/lib/prisma/client';

export const getDBSession = async (userId: string) => {
  try {
    const session = await prisma.session.findFirst({
      where: { userId },
      /*
      include: { user: true },
      */
    });
    return session;
  } catch (err) {
    console.log('ERROR in getSessionFromDB:', err);
    throw err;
  }
};
