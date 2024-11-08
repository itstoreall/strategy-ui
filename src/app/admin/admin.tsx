'use client';

import { useSession } from 'next-auth/react';
import PageWrapperContainer from '@/src/components/Container/PageWrapper';
import Header from '@/src/components/Layout/Header';
import Admin from '@/src/components/Pages/Admin';
import Footer from '@/src/components/Layout/Footer';

export const AdminPage: React.FC = () => {
  const session = useSession();

  return (
    <PageWrapperContainer>
      <Header session={session} />
      <Admin session={session} />
      <Footer />
    </PageWrapperContainer>
  );
};
