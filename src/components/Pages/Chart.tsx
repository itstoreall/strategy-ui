'use client';

import PageContainer, { Label } from '@/src/components/Container/Page';
import ChartSection from '@/src/components/Section/Chart/ChartSection';
import PageHeading from '@/src/components/Layout/PageHeading';

const Chart = () => {
  return (
    <PageContainer label={Label.Chart}>
      <main className="main chart">
        <PageHeading title={'Chart'} />
        <ChartSection />
      </main>
    </PageContainer>
  );
};

export default Chart;
