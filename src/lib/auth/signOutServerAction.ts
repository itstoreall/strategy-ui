'use server';

import { auth, signOut } from '@/src/lib/auth/authConfig';
import { prisma } from '@/src/lib/prisma/client';

export const handleSignOut = async () => {
  const session = await auth();
  if (session && session.user?.id) {
    try {
      await prisma.session.deleteMany({ where: { userId: session.user.id } });
      await signOut();
    } catch (err) {
      throw err;
    }
  }
};
