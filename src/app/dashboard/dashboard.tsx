'use client';

import { useSession } from 'next-auth/react';
import PageWrapperContainer from '@/src/components/Container/PageWrapper';
import Header from '@/src/components/Layout/Header';
// import Dashboard from '@/src/components/Pages/Dashboard';
import Footer from '@/src/components/Layout/Footer';

export const DashboardPage: React.FC = () => {
  const session = useSession();

  return (
    <PageWrapperContainer>
      <Header session={session} />
      {/* <Dashboard /> */}
      <Footer />
    </PageWrapperContainer>
  );
};
