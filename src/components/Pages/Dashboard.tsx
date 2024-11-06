'use client';

import Container, { Label } from '@/src/components/Container/Page';
import AccountSnapshotSection from '@/src/components/Section/AccountSnapshotSection';
import PageHeading from '@/src/components/Layout/PageHeading';
// import MockDataList from '@/src/components/MockDataList';

const Dashboard = () => {
  return (
    <Container label={Label.Main}>
      <main className="main">
        <PageHeading title={'Dashboard'} />

        <div className="main-content">
          <AccountSnapshotSection />
        </div>

        {/* <MockDataList items={120} /> */}
      </main>
    </Container>
  );
};

export default Dashboard;
