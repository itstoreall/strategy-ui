'use server';

import { userService } from '@/src/services/user.service';

export const getAllUsers = async () => {
  try {
    return await userService.getAllUsers();
  } catch (err) {
    console.log('ERROR in getAllUsers:', err);
  }
};
