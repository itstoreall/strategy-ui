/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useEffect, useState } from 'react';
import { SessionContextValue } from 'next-auth/react';
import PageContainer, { Label } from '@/src/components/Container/Page';
import PageHeading from '../Layout/PageHeading';
import MainLoader from '../MainLoader';
import useCreateToken from '@/src/hooks/token/useCreateToken';

type Props = { session: SessionContextValue };

const Admin = ({ session }: Props) => {
  const [isLoader, setIsLoader] = useState(true);

  const { mutate: createToken } = useCreateToken();

  useEffect(() => {
    setTimeout(() => session && setIsLoader(false), 2000);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createToken({ symbol: 'BTC', name: 'bitcoin' });
  };

  return (
    <PageContainer label={Label.Main}>
      <main className="main">
        <PageHeading title={'Admin'} />

        {!isLoader ? (
          <div className="main-content">
            <button onClick={handleSubmit}>Add</button>
          </div>
        ) : (
          <MainLoader />
        )}
      </main>
    </PageContainer>
  );
};

export default Admin;
