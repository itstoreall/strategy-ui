'use client';

import { SessionContextValue } from 'next-auth/react';
import useModal from '@/src/hooks/useModal';
import { handleSignOut } from '@/src/lib/auth/signOutServerAction';
import EditUsernameForm from '@/src/components/Form/EditUsernameForm';
import PageContainer, { Label } from '@/src/components/Container/Page';
import PageHeading from '@/src/components/Layout/PageHeading';
import OptionSection from '../Section/OptionSection';
import Button from '@/src/components/Button/Button';
import MainLoader from '../MainLoader';
import useSettings from '@/src/hooks/useSettings';
// import MockDataList from '../MockDataList';

type Props = { session: SessionContextValue };

const Settings = ({ session }: Props) => {
  const {
    role,
    isAuth,
    username,
    isPending,
    isAccountLinked,
    setUsername,
    handleUpdateUsername,
    handleGoogleAccount,
  } = useSettings(session.status);

  const { RenderModal } = useModal();

  return (
    <PageContainer label={Label.Main}>
      <main className="main">
        <PageHeading title={'Settings'} role={role} />

        {isAuth && username && role ? (
          <div className="main-content">
            <OptionSection name={'Name'} value={username} />

            <Button clickContent={handleGoogleAccount} disabled={isPending}>
              {!isAccountLinked
                ? 'Connect Google Account'
                : 'Disconnect Google Account'}
            </Button>

            <Button clickContent={handleSignOut} disabled={isPending}>
              {'Sign Out'}
            </Button>
          </div>
        ) : (
          <MainLoader />
        )}

        {/* <MockDataList items={120} /> */}

        <RenderModal>
          <EditUsernameForm
            username={username}
            setUsername={setUsername}
            update={handleUpdateUsername}
          />
        </RenderModal>
      </main>
    </PageContainer>
  );
};

export default Settings;
