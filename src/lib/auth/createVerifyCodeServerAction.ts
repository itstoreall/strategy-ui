'use server';

import { userService } from '@/src/app/api/services/user.service';

export const createVerifyCodeServerAction = async (email: string) => {
  try {
    const res = await userService.createVerifyCode(email);
    if (res) return res;
  } catch (err) {
    console.log('ERROR in createVerifyCodeServerAction:', err);
    // return { error: (err as CredentialsSignin).type };
  }
};
