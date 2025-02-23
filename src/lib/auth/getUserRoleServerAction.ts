'use server';

import { userService } from '@/src/services/user.service';
import { getSessionUserId } from '@/src/lib/auth/getSessionUserId';

export const getUserRole = async (userId?: string) => {
  const uuid = userId ? userId : await getSessionUserId();
  return await userService.getRole(uuid);
};
