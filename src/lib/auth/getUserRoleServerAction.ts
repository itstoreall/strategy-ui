'use server';

import { userService } from '@/src/services/user.service';
import { getSessionUserId } from '@/src/lib/auth/getSessionUserId';

export const getUserRole = async () => {
  const uuid = await getSessionUserId();
  return await userService.getRole(uuid);
};
