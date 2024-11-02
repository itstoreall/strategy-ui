'use server';

import { userService } from '@/src/app/api/services/user.service';

export const clearExpiredTokens = async () => {
  const res = await userService.removeTokens();
  console.log('--=-=-= clear expired tokens', res.deletedCount, '=-=-=--');
  return res;
};