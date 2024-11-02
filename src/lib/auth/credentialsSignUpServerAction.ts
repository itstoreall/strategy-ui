'use server';

import { userService } from '@/src/app/api/services/user.service';
import bcrypt from 'bcrypt';

export const credentialsSignUp = async (email: string, password: string) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const res = await userService.credentialsSignUp(email, hashedPassword);
    if (res) return res;
  } catch (err) {
    console.log('ERROR in credentialsSignUp:', err);
    // return { error: (err as CredentialsSignin).type };
  }
};
