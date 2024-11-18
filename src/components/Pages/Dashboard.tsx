'use client';

import { useEffect, useState } from 'react';
import PageContainer, { Label } from '@/src/components/Container/Page';
import AccountSnapshotSection from '@/src/components/Section/AccountSnapshotSection';
import PageHeading from '@/src/components/Layout/PageHeading';
import MainLoader from '../MainLoader';
import useTokens from '@/src/hooks/token/useToken';
import useCreateToken from '@/src/hooks/token/useCreateToken';
// import MockDataList from '@/src/components/MockDataList';

const Dashboard = () => {
  const [isLoader, setIsLoader] = useState(true);

  const { data } = useTokens({});
  const { mutate: createToken } = useCreateToken();

  useEffect(() => {
    setTimeout(() => setIsLoader(false), 2000);
  }, []);

  // console.log('tokens:', data);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createToken({ symbol: 'BTC', name: 'bitcoin' });
  };

  return (
    <PageContainer label={Label.Main}>
      <main className="main">
        <PageHeading title={'Dashboard'} />

        {!isLoader ? (
          <div className="main-content">
            <AccountSnapshotSection />
          </div>
        ) : (
          <MainLoader />
        )}

        <ul>
          {data?.tokens.map((token) => (
            <li key={token.id}>{token.symbol}</li>
          ))}
        </ul>

        <button onClick={handleSubmit}>Add</button>

        {/* <MockDataList items={120} /> */}
      </main>
    </PageContainer>
  );
};

export default Dashboard;
