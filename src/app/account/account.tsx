'use client';

import Navigation from '@/src/components/Navigation';
import { useSession } from 'next-auth/react';

export const AccountPage: React.FC = () => {
  const session = useSession();

  return (
    <>
      <Navigation session={session} />
      <p>{'Account'}</p>
    </>
  );
};
