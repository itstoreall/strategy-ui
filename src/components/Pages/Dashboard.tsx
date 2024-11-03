import Container, { Label } from '@/src/components/Container/Page';

const Dashboard = () => {
  return (
    <main>
      <Container label={Label.Main}>
        <h2>Dashboard</h2>

        <ul>
          {[...Array(100)].map((_, index) => (
            <li key={index}>{index + 1}</li>
          ))}
        </ul>
      </Container>
    </main>
  );
};

export default Dashboard;
