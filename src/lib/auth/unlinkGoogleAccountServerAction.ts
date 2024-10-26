'use server';

import axios from 'axios';
import { auth } from '@/src/lib/auth/authConfig';

type DeleteAccount = (userId: string) => Promise<boolean>;

const strategyApiUrl = process.env.NEXT_PUBLIC_STRATEGY_API_URL;

export const deleteAccount: DeleteAccount = async (userId: string) => {
  try {
    const url = `${strategyApiUrl}/api/user/account/google/${userId}`;
    const response = await axios.delete(url);
    return response.data;
  } catch (error) {
    console.error('Failed to unlink Google account:', error);
    throw error;
  }
};

export const unlinkGoogleAccount = async () => {
  const session = await auth();
  if (!session) throw new Error('Unauthorized');
  const uuid: string = session.user!.id!;

  /*
  const uuidRegExp: RegExp =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
  if (typeof uuid !== 'string' || !uuidRegExp.test(uuid)) {
    throw new Error('Invalid UUID');
  }
  */

  if (typeof uuid !== 'string') throw new Error('Invalid UUID');
  return await deleteAccount(uuid);
};
