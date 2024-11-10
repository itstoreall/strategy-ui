'use server';

import bcrypt from 'bcrypt';
import { userService } from '@/src/app/api/services/user.service';

export const updateUserCredentials = async (
  email: string,
  password: string,
  code: string
) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const res = await userService.updateCredentials(
      email,
      hashedPassword,
      code
    );
    if (res) return res;
  } catch (err) {
    console.error('ERROR in updateUserCredentials:', err);
    return { updated: false };
  }
};
