'use client';

import Container, { Label } from '@/src/components/Container/Page';
// import Title from '@/src/components/Layout/Title';
import AccountSnapshotSection from '@/src/components/Section/AccountSnapshotSection';
import PageHeading from '../Layout/PageHeading';
// import MockDataList from '@/src/components/MockDataList';

const Dashboard = () => {
  return (
    <Container label={Label.Main}>
      <main className="main">
        {/* <div className="main-heading">
          <Title tag={'h2'} text={'Dashboard'} />
          {role && <span className="user-role">{role}</span>}
        </div> */}

        <PageHeading title={'Dashboard'} />

        <AccountSnapshotSection />
        <AccountSnapshotSection />

        {/* <MockDataList items={120} /> */}
      </main>
    </Container>
  );
};

export default Dashboard;
