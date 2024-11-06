/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import PageWrapper from '@/src/components/Container/PageWrapper';
import Home from '@/src/components/Pages/Home';

export default function HomePage() {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push('/dashboard');
    }, 5000);
  }, []);

  return (
    <PageWrapper>
      <Home session={session} />
    </PageWrapper>
  );
}
