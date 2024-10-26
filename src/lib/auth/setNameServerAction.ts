'use server';

import axios from 'axios';
import { auth } from '@/src/lib/auth/authConfig';

type UpdateName = (userId: string, name: string) => Promise<boolean>;

const strategyApiUrl = process.env.NEXT_PUBLIC_STRATEGY_API_URL;

export const updateName: UpdateName = async (userId, name) => {
  try {
    const url = `${strategyApiUrl}/api/user/update-name`;
    const response = await axios.put(url, { userId, name });
    return response.data;
  } catch (error) {
    console.error('Failed to set name:', error);
    throw error;
  }
};

export const setName = async (name: string): Promise<boolean> => {
  const session = await auth();
  if (!session) throw new Error('Unauthorized');
  const uuid: string = session.user!.id!;
  if (typeof uuid !== 'string') throw new Error('Invalid UUID');
  return await updateName(uuid, name.trim());
};
