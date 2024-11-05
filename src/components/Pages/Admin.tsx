'use client';

import { SessionContextValue } from 'next-auth/react';
import Container, { Label } from '@/src/components/Container/Page';
import PageHeading from '../Layout/PageHeading';

type Props = { session: SessionContextValue };

const Admin = ({ session }: Props) => {
  console.log('session', session);

  return (
    <Container label={Label.Main}>
      <main className="main">
        <PageHeading title={'Admin'} />

        <p>This Page is only accessible to users with the ADMIN role</p>
        <a href="/dashboard">Go to Dashboard</a>
      </main>
    </Container>
  );
};

export default Admin;
