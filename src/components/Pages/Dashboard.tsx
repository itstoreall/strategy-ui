'use client';

import Container, { Label } from '@/src/components/Container/Page';
import Title from '@/src/components/Layout/Title';
import AccountSnapshot from '../Section/AccountSnapshot';
// import MockDataList from '@/src/components/MockDataList';

const Dashboard = () => {
  return (
    <Container label={Label.Main}>
      <main className="main">
        <Title tag={'h2'} text={'Dashboard'} />

        <AccountSnapshot />

        {/* <MockDataList items={120} /> */}
      </main>
    </Container>
  );
};

export default Dashboard;
