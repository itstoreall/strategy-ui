'use client';

import { useSession } from 'next-auth/react';
import PageWrapper from '@/src/components/Container/PageWrapper';
import Header from '@/src/components/Layout/Header';
import Settings from '@/src/components/Pages/Settings';
import Footer from '@/src/components/Layout/Footer';

export const SettingsPage: React.FC = () => {
  const session = useSession();

  return (
    <PageWrapper>
      <Header session={session} />
      <Settings />
      <Footer />
    </PageWrapper>
  );
};
