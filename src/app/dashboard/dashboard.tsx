'use client';

import { useSession } from 'next-auth/react';
import PageWrapper from '@/src/components/Container/PageWrapper';
import Header from '@/src/components/Layout/Header';
import Dashboard from '@/src/components/Pages/Dashboard';
import Footer from '@/src/components/Layout/Footer';

export const DashboardPage: React.FC = () => {
  const session = useSession();

  return (
    <PageWrapper>
      <Header session={session} />
      <Dashboard />
      <Footer />
    </PageWrapper>
  );
};
