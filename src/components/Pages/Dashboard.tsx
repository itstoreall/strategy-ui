'use client';

import Container, { Label } from '@/src/components/Container/Page';
import Title from '@/src/components/Layout/Title';
import AccountSnapshot from '../Section/AccountSnapshot';

const Dashboard = () => {
  return (
    <Container label={Label.Main}>
      <main className="main">
        <Title tag={'h2'} text={'Dashboard'} />

        <AccountSnapshot />

        {/* <ul>
          {[...Array(120)].map((_, index) => (
            <li key={index}>{index + 1}</li>
          ))}
        </ul> */}
      </main>
    </Container>
  );
};

export default Dashboard;
