/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useSession } from 'next-auth/react';
import PageWrapper from '@/src/components/Container/PageWrapper';
import Home from '@/src/components/Pages/Home';

export default function HomePage() {
  const session = useSession();

  return (
    <PageWrapper>
      <Home session={session} />
    </PageWrapper>
  );
}
