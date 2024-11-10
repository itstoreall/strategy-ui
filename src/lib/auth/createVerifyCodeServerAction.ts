'use server';

import { userService } from '@/src/app/api/services/user.service';

type CreateVerifyCodeRes = {
  identifier: string;
  code: string;
  url: string;
  expires: Date;
};

type CreateVerifyCode = (args: {
  email: string;
  code: string;
}) => Promise<CreateVerifyCodeRes | undefined>;

export const createVerifyCodeServerAction: CreateVerifyCode = async (args) => {
  try {
    const res = await userService.createVerifyCode(args.email, args.code);
    if (res) return res;
  } catch (err) {
    console.log('ERROR in createVerifyCodeServerAction:', err);
    // return { error: (err as CredentialsSignin).type };
  }
};
