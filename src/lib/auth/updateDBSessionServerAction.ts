'use server';

import { prisma } from '@/src/lib/prisma/client';

export const updateDBSession = async (
  sessionToken: string, // using userId instead of sessionToken!
  updates: Partial<{ expires: Date }>
) => {
  try {
    const updatedSession = await prisma.session.update({
      where: { sessionToken },
      data: updates,
    });
    return updatedSession;
  } catch (err) {
    console.log('ERROR in updateDBSession:', err);
    throw err;
  }
};
