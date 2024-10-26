'use server';

import axios from 'axios';
import { auth } from '@/src/lib/auth/authConfig';

type GetStatus = (userId: string) => Promise<boolean>;

const strategyApiUrl = process.env.NEXT_PUBLIC_STRATEGY_API_URL;

export const getLinkStatus: GetStatus = async (userId) => {
  try {
    const url = `${strategyApiUrl}/api/user/account/google/${userId}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error checking Google account link status:', error);
    throw error;
  }
};

export const getAccountLinkStatus = async () => {
  const session = await auth();
  if (!session) throw new Error('Unauthorized');
  const uuid: string = session.user!.id!;
  if (typeof uuid !== 'string') throw new Error('Invalid UUID');
  return await getLinkStatus(uuid);
};
