/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useEffect, useState } from 'react';
import { SessionContextValue } from 'next-auth/react';
import PageContainer, { Label } from '@/src/components/Container/Page';
import AddTokenSection from '@/src/components/Section/Admin/AddToken';
import PageHeading from '@/src/components/Layout/PageHeading';
import MainLoader from '@/src/components/MainLoader';

import useUpdatePrices from '@/src/hooks/token/useUpdatePrices';
import { TokenData } from '@/src/types';

type Props = { session: SessionContextValue };

const Admin = ({ session }: Props) => {
  const { mutate: updatePrices } = useUpdatePrices();
  const [updateResponse, setUpdateResponse] = useState<TokenData | null>(null);

  const fetchTokens = async () => {
    const params = {};
    updatePrices(params, {
      onSuccess: (data) => {
        setUpdateResponse(data);
      },
      onError: (error) => {
        console.error('ERROR in updating prices (Dashboard):', error);
      },
    });
  };

  useEffect(() => {
    fetchTokens();
  }, [updatePrices]);

  return (
    <PageContainer label={Label.Main}>
      <main className="main">
        <PageHeading title={'Admin'} />

        {session && updateResponse ? (
          <div className="main-content">
            <AddTokenSection
              tokens={updateResponse.tokens}
              fetchTokens={fetchTokens}
            />
          </div>
        ) : (
          <MainLoader />
        )}
      </main>
    </PageContainer>
  );
};

export default Admin;
