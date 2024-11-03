'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import PageWrapper from '@/src/components/Container/PageWrapper';
import Dashboard from '@/src/components/Pages/Dashboard';
import Header from '@/src/components/Layout/Header';
import Footer from '@/src/components/Layout/Footer';

export const DashboardPage: React.FC = () => {
  const session = useSession();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageWrapper>
      <Header session={session} />
      <Dashboard />
      <Footer />
    </PageWrapper>
  );
};
