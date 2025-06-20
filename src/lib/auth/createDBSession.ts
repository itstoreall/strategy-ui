'use server';

import { prisma } from '@/src/lib/prisma/client';

export const createDBSession = async (userId: string, expires: Date) => {
  try {
    const newSession = await prisma.session.create({
      data: {
        userId,
        sessionToken: userId,
        expires,
      },
    });

    return newSession;
  } catch (err) {
    console.log('ERROR in createDBSession:', err);
    throw err;
  }
};
