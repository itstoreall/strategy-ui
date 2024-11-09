'use client';

import { useSession } from 'next-auth/react';
import PageWrapperContainer from '@/src/components/Container/PageWrapper';
import Header from '@/src/components/Layout/Header';
import Settings from '@/src/components/Pages/Settings';
import Footer from '@/src/components/Layout/Footer';

export const SettingsPage: React.FC = () => {
  const session = useSession();

  return (
    <PageWrapperContainer>
      <Header session={session} />
      <Settings session={session} />
      <Footer />
    </PageWrapperContainer>
  );
};
