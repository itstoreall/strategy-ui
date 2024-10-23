'use server';

import { prisma } from '@/src/lib/prisma/client';

export const clearExpiredVerificationTokens = async () => {
  const now = new Date().toISOString();

  try {
    await prisma.verificationToken.deleteMany({
      where: { expires: { lt: now } },
    });
  } catch (error) {
    throw error;
  }
};

/*
new Date(): 2024-10-21T18:07:31.711Z
date in db: 2024-10-22 18:06:35.981

For texting:
const nowPlus24Hours = new Date();
nowPlus24Hours.setHours(nowPlus24Hours.getHours() + 24); // Add 24 hours
const nowUTCPlus24Hours = nowPlus24Hours.toISOString();

lt: nowUTCPlus24Hours
*/
