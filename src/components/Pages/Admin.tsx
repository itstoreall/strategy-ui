'use client';

import Container, { Label } from '@/src/components/Container/Page';

const Dashboard = () => {
  return (
    <Container label={Label.Main}>
      <main className="main">
        <h2>Admin Page</h2>
        <p>This Page is only accessible to users with the ADMIN role</p>
        <a href="/dashboard">Go to Dashboard</a>
      </main>
    </Container>
  );
};

export default Dashboard;
