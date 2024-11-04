'use client';

import Container, { Label } from '@/src/components/Container/Page';
import Title from '@/src/components/Layout/Title';

const Dashboard = () => {
  return (
    <Container label={Label.Main}>
      <main className="main">
        <Title tag={'h2'} text={'Admin'} />

        <p>This Page is only accessible to users with the ADMIN role</p>
        <a href="/dashboard">Go to Dashboard</a>
      </main>
    </Container>
  );
};

export default Dashboard;
