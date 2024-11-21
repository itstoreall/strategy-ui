'use client';

import useFetchAllTokens from '@/src/hooks/token/useFetchAllTokens';
import PageContainer, { Label } from '@/src/components/Container/Page';
import AccountSnapshotSection from '@/src/components/Section/AccountSnapshotSection';
import PageHeading from '@/src/components/Layout/PageHeading';
import MainLoader from '@/src/components/MainLoader';

const Dashboard = () => {
  const { updatedTokens } = useFetchAllTokens();

  return (
    <PageContainer label={Label.Main}>
      <main className="main">
        <PageHeading title={'Dashboard'} />

        {updatedTokens ? (
          <div className="main-content">
            <AccountSnapshotSection />

            <ul>
              {updatedTokens?.map((token) => (
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
