'use client';

import PageContainer, { Label } from '@/src/components/Container/Page';
import TradingViewWidget from '@/src/components/TradingViewWidget';

const Chart = () => {
  return (
    <PageContainer label={Label.Chart}>
      <main className="main chart">
        <TradingViewWidget />
      </main>
    </PageContainer>
  );
};

export default Chart;
