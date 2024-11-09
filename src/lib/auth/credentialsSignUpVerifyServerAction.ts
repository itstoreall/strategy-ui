'use server';

import { userService } from '@/src/app/api/services/user.service';

export const credentialsSignUpVerifyServerAction = async (
  email: string,
  code: string
) => {
  try {
    const res = await userService.createVerifyCode(email, code);
    if (res) return res;
  } catch (err) {
    console.log('ERROR in credentialsSignUpVerifyServerAction:', err);
    // return { error: (err as CredentialsSignin).type };
  }
};
