'use client';

import { SessionContextValue } from 'next-auth/react';
import useSettings from '@/src/hooks/useSettings';
import useModal from '@/src/hooks/useModal';
import { handleSignOut } from '@/src/lib/auth/signOutServerAction';
import ButtonFullScreenContainer from '@/src/components/Container/ButtonFullScreen';
import PageContainer, { Label } from '@/src/components/Container/Page';
import EditUsernameForm from '@/src/components/Form/EditUsernameForm';
import OptionSection from '@/src/components/Section/OptionSection';
import PageHeading from '@/src/components/Layout/PageHeading';
import MainLoader from '@/src/components/MainLoader';
import Button from '@/src/components/Button/Button';
// import MockDataList from '../MockDataList';

const config = {
  pageTitle: 'Settings',
  connectAccount: 'Connect Google Account',
  disconnectAccount: 'Disconnect Google Account',
  signOut: 'Sign Out',
};

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
        <PageHeading title={config.pageTitle} role={role} />

        {isAuth && username && role ? (
          <div className="main-content">
            <OptionSection name={'Name'} value={username} />

            <ButtonFullScreenContainer>
              <Button clickContent={handleGoogleAccount} disabled={isPending}>
                {!isAccountLinked
                  ? config.connectAccount
                  : config.disconnectAccount}
              </Button>

              <Button clickContent={handleSignOut} disabled={isPending}>
                {config.signOut}
              </Button>
            </ButtonFullScreenContainer>
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
