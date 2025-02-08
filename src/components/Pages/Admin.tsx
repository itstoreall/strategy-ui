/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { SessionContextValue } from 'next-auth/react';
import useFetchAllTokens from '@/src/hooks/token/useFetchAllTokens';
import useModal from '@/src/hooks/useModal';
import PageContainer, { Label } from '@/src/components/Container/Page';
import AddTokenSection from '@/src/components/Section/Admin/AddTokenSection';
import AddTokenForm from '@/src/components/Form/Token/AddTokenForm';
import PageHeading from '@/src/components/Layout/PageHeading';
import MainLoader from '@/src/components/MainLoader';

type Props = { session: SessionContextValue };

const Admin = ({ session }: Props) => {
  const { updatedTokens, fetchTokens } = useFetchAllTokens();

  const { RenderModal } = useModal();

  return (
    <PageContainer label={Label.Main}>
      <main className="main">
        <PageHeading title={'Admin'} />

        {session && updatedTokens ? (
          <div className="main-content">
            <AddTokenSection tokens={updatedTokens} />
          </div>
        ) : (
          <MainLoader />
        )}

        <RenderModal>
          <AddTokenForm fetchTokens={fetchTokens} />
        </RenderModal>
      </main>
    </PageContainer>
  );
};

export default Admin;
