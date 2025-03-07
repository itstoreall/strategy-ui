'use client';

/* eslint-disable react-hooks/exhaustive-deps */
import { SessionContextValue } from 'next-auth/react';
import useGlobalState from '@/src/hooks/useGlobalState';
import useModal from '@/src/hooks/useModal';
import PageContainer, { Label } from '@/src/components/Container/Page';
import AddTokenSection from '@/src/components/Section/Admin/AddTokenSection';
import AddTokenForm from '@/src/components/Form/Token/AddTokenForm';
import PageHeading from '@/src/components/Layout/PageHeading';
import MainLoader from '@/src/components/MainLoader';

type Props = { session: SessionContextValue };

const Admin = ({ session }: Props) => {
  // const userId = session.data?.user?.id;

  const { updatedTokens, fetchTokens } = useGlobalState();
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
