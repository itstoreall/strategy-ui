'use client';

import { SessionContextValue } from 'next-auth/react';
import useAdmin from '@/src/hooks/useAdmin';
import useModal from '@/src/hooks/useModal';
import useGlobalState from '@/src/hooks/useGlobalState';
import AddTokenForm from '@/src/components/Form/Token/AddTokenForm';
import MainDividerSection from '@/src/components/Section/MainDividerSection';
import ClearSessionSection from '@/src/components/Section/Admin/ClearSessionSection';
import AdminSnapshotSection from '@/src/components/Section/AdminSnapshotSection';
import AddTokenSection from '@/src/components/Section/Admin/AddTokenSection';
import UserListSection from '@/src/components/Section/Admin/UserListSection';
import PageContainer, { Label } from '@/src/components/Container/Page';
import PageHeading from '@/src/components/Layout/PageHeading';
import MainLoader from '@/src/components/MainLoader';
// import useFetchAllUsers from '@/src/hooks/user/useFetchAllUsers';

type Props = { session: SessionContextValue };

const Admin = ({ session }: Props) => {
  const { updatedTokens, users, fetchTokens } = useGlobalState();
  // const { users } = useFetchAllUsers({ enabled: true });
  const { userOptions } = useAdmin(users ?? null);
  const { RenderModal } = useModal();

  return (
    <PageContainer label={Label.Main}>
      <main className="main">
        <PageHeading title={'Admin'} />

        {session && users && updatedTokens ? (
          <div className="main-content">
            <AdminSnapshotSection
              usersNumber={users?.length ?? 0}
              tokensNumber={updatedTokens.length}
            />

            <MainDividerSection
              className="admin-main-content-devider"
              title="Tokens"
            />
            <AddTokenSection tokens={updatedTokens} />

            <MainDividerSection
              className="admin-main-content-devider"
              title="Users"
            />
            <UserListSection
              users={users}
              // sessions={[]}
            />

            <MainDividerSection
              className="admin-main-content-devider"
              title="Sessions"
            />
            <ClearSessionSection userOptions={userOptions} />
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
