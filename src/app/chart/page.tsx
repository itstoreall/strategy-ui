'use client';

import { useSession } from 'next-auth/react';
import PageWrapperContainer from '@/src/components/Container/PageWrapper';
import Header from '@/src/components/Layout/Header';
import Chart from '@/src/components/Pages/Chart';
import Footer from '@/src/components/Layout/Footer';

const ChartPage: React.FC = () => {
  const session = useSession();

  return (
    <PageWrapperContainer>
      <Header session={session} />
      <Chart />
      <Footer />
    </PageWrapperContainer>
  );
};

export default ChartPage;
