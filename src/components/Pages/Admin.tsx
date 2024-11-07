/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useEffect, useState } from 'react';
import { SessionContextValue } from 'next-auth/react';
import Container, { Label } from '@/src/components/Container/Page';
import PageHeading from '../Layout/PageHeading';
import MainLoader from '../MainLoader';

type Props = { session: SessionContextValue };

const Admin = ({ session }: Props) => {
  const [isLoader, setIsLoader] = useState(true);

  useEffect(() => {
    setTimeout(() => session && setIsLoader(false), 2000);
  }, []);

  return (
    <Container label={Label.Main}>
      <main className="main">
        <PageHeading title={'Admin'} />

        {!isLoader ? (
          <div className="main-content">
            <p>This Page is only accessible to users with the ADMIN role</p>
            <a href="/dashboard">Go to Dashboard</a>
          </div>
        ) : (
          <MainLoader />
        )}
      </main>
    </Container>
  );
};

export default Admin;
