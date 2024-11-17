'use client';

import { useSession } from 'next-auth/react';
import PageWrapperContainer from '@/src/components/Container/PageWrapper';
import Header from '@/src/components/Layout/Header';
import Chart from '@/src/components/Pages/Chart';

const ChartPage: React.FC = () => {
  const session = useSession();

  return (
    <PageWrapperContainer>
      <Header session={session} />
      <Chart />
    </PageWrapperContainer>
  );
};

export default ChartPage;
