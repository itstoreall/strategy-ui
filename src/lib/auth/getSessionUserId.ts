import { auth } from '@/src/lib/auth/authConfig';

export const getSessionUserId = async () => {
  const session = await auth();
  if (!session) throw new Error('Unauthorized');
  // console.log('------ session ------', session);
  const uuid = session?.user?.id;
  if (typeof uuid !== 'string') {
    throw new Error('Invalid UUID');
  } else return uuid;
};
