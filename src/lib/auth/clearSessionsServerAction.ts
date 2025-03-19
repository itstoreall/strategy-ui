'use server';

import { prisma } from '@/src/lib/prisma/client';

export const clearSessions = async (userId?: string) => {
  try {
    if (userId) {
      return !!(await prisma.session.deleteMany({ where: { userId } })).count;
    } else {
      return !!(await prisma.session.deleteMany()).count;
    }
  } catch (err) {
    console.log('ERROR in clearSessions:', err);
  }
};
