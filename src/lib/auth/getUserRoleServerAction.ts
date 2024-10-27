'use server';

import axios from 'axios';
import { auth } from '@/src/lib/auth/authConfig';

type GetRole = (userId: string) => Promise<'USER' | 'ADMIN'>;

const strategyApiUrl = process.env.NEXT_PUBLIC_STRATEGY_API_URL;

export const getRole: GetRole = async (userId: string) => {
  try {
    const url = `${strategyApiUrl}/api/user/role/${userId}`;
    const response = await axios.get(url);
    return response.data.role;
  } catch (error) {
    console.error('Failed to retrieve user role:', error);
    return null;
  }
};

export const getUserRole = async () => {
  const session = await auth();
  if (session) {
    const uuid = session.user?.id;
    if (typeof uuid !== 'string') throw new Error('Invalid UUID');
    return await getRole(uuid);
  }
};
