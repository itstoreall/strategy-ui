'use client';

import { useSession } from 'next-auth/react';
import PageWrapperContainer from '@/src/components/Container/PageWrapper';
import Header from '@/src/components/Layout/Header';
import Strategy from '@/src/components/Pages/Strategy';
import Footer from '@/src/components/Layout/Footer';

export const StrategyPage: React.FC = () => {
  const session = useSession();

  return (
    <PageWrapperContainer>
      <Header session={session} />
      <Strategy />
      <Footer />
    </PageWrapperContainer>
  );
};
