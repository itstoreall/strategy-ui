'use client';

import { useSession } from 'next-auth/react';
import PageWrapper from '@/src/components/Container/PageWrapper';
import Header from '@/src/components/Layout/Header';
import Admin from '@/src/components/Pages/Admin';
import Footer from '@/src/components/Layout/Footer';

export const AdminPage: React.FC = () => {
  const session = useSession();

  return (
    <PageWrapper>
      <Header session={session} />
      <Admin />
      <Footer />
    </PageWrapper>
  );
};
