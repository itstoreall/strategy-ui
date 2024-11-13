'use client';

import { useEffect, useState } from 'react';
import PageContainer, { Label } from '@/src/components/Container/Page';
import AccountSnapshotSection from '@/src/components/Section/AccountSnapshotSection';
import PageHeading from '@/src/components/Layout/PageHeading';
import MainLoader from '../MainLoader';
import TradingViewWidget from '../TradingViewWidget';
// import MockDataList from '@/src/components/MockDataList';

const Dashboard = () => {
  const [isLoader, setIsLoader] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoader(false), 2000);
  }, []);

  return (
    <PageContainer label={Label.Main}>
      <main className="main">
        <PageHeading title={'Dashboard'} />

        {!isLoader ? (
          <div className="main-content">
            <AccountSnapshotSection />

            <TradingViewWidget />
          </div>
        ) : (
          <MainLoader />
        )}

        {/* <MockDataList items={120} /> */}
      </main>
    </PageContainer>
  );
};

export default Dashboard;
