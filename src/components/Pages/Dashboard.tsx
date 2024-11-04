'use client';

import Container, { Label } from '@/src/components/Container/Page';

const Dashboard = () => {
  return (
    <main className="main">
      <Container label={Label.Main}>
        <h2>Dashboard</h2>

        <ul>
          {[...Array(120)].map((_, index) => (
            <li key={index}>{index + 1}</li>
          ))}
        </ul>
      </Container>
    </main>
  );
};

export default Dashboard;
