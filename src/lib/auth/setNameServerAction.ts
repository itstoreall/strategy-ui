'use server';

import { userService } from '@/src/app/api/services/user.service';
import { getSessionUserId } from '@/src/lib/auth/getSessionUserId';

export const setUserName = async (name: string) => {
  const uuid = await getSessionUserId();
  return await userService.updateName(uuid, name.trim());
};
