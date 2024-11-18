'use server';

import { userService } from '@/src/services/user.service';

export const deleteUserServerAction = async (id: string) => {
  try {
    const res = await userService.deleteUser(id);
    console.log('deleteUserServerAction res:', res);
    return res;
  } catch (err) {
    console.log('ERROR in deleteUserServerAction:', err);
    // return { error: (err as YourErrorType).type };
  }
};
