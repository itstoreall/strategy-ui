'use client';

import { SessionContextValue } from 'next-auth/react';
import AddTokenForm from '@/src/components/Form/Token/AddTokenForm';
import MainDividerSection from '@/src/components/Section/MainDividerSection';
import ClearSessionSection from '@/src/components/Section/Admin/ClearSessionSection';
import AdminSnapshotSection from '@/src/components/Section/AdminSnapshotSection';
import AddTokenSection from '@/src/components/Section/Admin/AddTokenSection';
import PageContainer, { Label } from '@/src/components/Container/Page';
import PageHeading from '@/src/components/Layout/PageHeading';
import MainLoader from '@/src/components/MainLoader';
import useAdmin from '@/src/hooks/useAdmin';

type Props = { session: SessionContextValue };

const Admin = ({ session }: Props) => {
  const { updatedTokens, fetchTokens, RenderModal, users, userOptions } =
    useAdmin(session);

  return (
    <PageContainer label={Label.Main}>
      <main className="main">
        <PageHeading title={'Admin'} />

        {session && updatedTokens ? (
          <div className="main-content">
            <AdminSnapshotSection
              usersNumber={users?.length ?? 0}
              tokensNumber={updatedTokens.length}
            />
            <MainDividerSection
              className="admin-main-content-devider"
              title="Sessions"
            />
            <ClearSessionSection userOptions={userOptions} />
            <MainDividerSection
              className="admin-main-content-devider"
              title="Tokens"
            />
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
