'use client';

import Container, { Label } from '@/src/components/Container/Page';

const Dashboard = () => {
  return (
    <Container label={Label.Main}>
      <main className="main">
        <h2>Dashboard</h2>

        <ul>
          {[...Array(120)].map((_, index) => (
            <li key={index}>{index + 1}</li>
          ))}
        </ul>
      </main>
    </Container>
  );
};

export default Dashboard;
