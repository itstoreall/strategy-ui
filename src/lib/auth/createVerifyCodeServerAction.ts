'use server';

import { userService } from '@/src/services/user.service';

export const createVerifyCodeServerAction = async (email: string) => {
  try {
    const res = await userService.createVerifyCode(email);
    if (res) return res;
  } catch (err) {
    console.error('ERROR in createVerifyCodeServerAction:', err);
    // return { error: (err as CredentialsSignin).type };
  }
};
