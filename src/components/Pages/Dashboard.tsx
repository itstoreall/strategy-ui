'use client';

import PageContainer, { Label } from '@/src/components/Container/Page';
import AccountSnapshotSection from '@/src/components/Section/AccountSnapshotSection';
import PageHeading from '@/src/components/Layout/PageHeading';
import MainLoader from '../MainLoader';
import { useEffect, useState } from 'react';
import useUpdatePrices from '@/src/hooks/token/useUpdatePrices';
import { TokenData } from '@/src/types';
// import MockDataList from '@/src/components/MockDataList';

const Dashboard = () => {
  const { mutate: updatePrices } = useUpdatePrices();
  const [updateResponse, setUpdateResponse] = useState<TokenData | null>(null);

  useEffect(() => {
    const params = {};
    updatePrices(params, {
      onSuccess: (data) => {
        setUpdateResponse(data);
      },
      onError: (error) => {
        console.error('ERROR in updating prices (Dashboard):', error);
      },
    });
  }, [updatePrices]);

  console.log('updateResponse:', updateResponse);

  return (
    <PageContainer label={Label.Main}>
      <main className="main">
        <PageHeading title={'Dashboard'} />

        {updateResponse ? (
          <div className="main-content">
            <AccountSnapshotSection />

            <ul>
              {updateResponse?.tokens.map((token) => (
                <li key={token.id}>{`${token.symbol}: ${token.price}`}</li>
              ))}
            </ul>
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
