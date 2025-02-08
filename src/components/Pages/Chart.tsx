'use client';

import PageContainer, { Label } from '@/src/components/Container/Page';
import ChartSection from '@/src/components/Section/Chart/ChartSection';

const Chart = () => {
  return (
    <PageContainer label={Label.Chart}>
      <main className="main chart">
        <ChartSection />
      </main>
    </PageContainer>
  );
};

export default Chart;
