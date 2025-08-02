'use client';

import { useSession } from 'next-auth/react';
import PageWrapperContainer from '@/src/components/Container/PageWrapper';
import Header from '@/src/components/Layout/Header';
import HodlTargets from '@/src/components/Pages/HodlTargets';
import Footer from '@/src/components/Layout/Footer';

export const HodlTargetsPage: React.FC = () => {
  const session = useSession();

  return (
    <PageWrapperContainer>
      <Header session={session} />
      <HodlTargets />
      <Footer />
    </PageWrapperContainer>
  );
};
