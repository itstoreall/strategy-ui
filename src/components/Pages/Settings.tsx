'use client';

import { useState } from 'react';
import { SessionContextValue } from 'next-auth/react';
import useSettings from '@/src/hooks/useSettings';
import useModal from '@/src/hooks/useModal';
import { handleSignOut } from '@/src/lib/auth/signOutServerAction';
import SectionsContainer from '@/src/components/Container/Sections';
import ButtonFullScreenContainer from '@/src/components/Container/ButtonFullScreen';
import PageContainer, { Label } from '@/src/components/Container/Page';
import MainDividerSection from '@/src/components/Section/MainDividerSection';
import OptionSection from '@/src/components/Section/OptionSection';
import EditUsernameForm from '@/src/components/Form/EditUsernameForm';
import PageHeading from '@/src/components/Layout/PageHeading';
import MainLoader from '@/src/components/MainLoader';
import Button from '@/src/components/Button/Button';

const config = {
  pageTitle: 'Settings',
  connectAccount: 'Connect Google Account',
  disconnectAccount: 'Disconnect Google Account',
  signOut: 'Sign Out',
  deleteUser: 'Delete Account',
};

type Props = { session: SessionContextValue };

const Settings = ({ session }: Props) => {
  const {
    role,
    email,
    isAuth,
    userId,
    username,
    isPending,
    isAccountLinked,
    setUsername,
    handleUpdateUsername,
    handleGoogleAccount,
    handleDeleteUser,
  } = useSettings(session);

  const { RenderModal } = useModal();

  const [isDisabled, setIsDisabled] = useState(true);

  return (
    <PageContainer label={Label.Main}>
      <main className="main">
        <PageHeading title={config.pageTitle} role={role} />

        {isAuth && username && role ? (
          <div className="main-content">
            <SectionsContainer>
              <OptionSection name={'User ID'} value={userId} />
              <OptionSection name={'Name'} value={username} mutable />
              <OptionSection name={'Email'} value={email ?? '...'} />
            </SectionsContainer>

            <MainDividerSection
              className="settings-devider"
              title={'Account management'}
              isSwitchButton
              isDisabled={isDisabled}
              setIsDisabled={setIsDisabled}
            />

            <ButtonFullScreenContainer>
              <Button
                clickContent={handleSignOut}
                disabled={isPending || isDisabled}
              >
                {config.signOut}
              </Button>

              <Button
                clickContent={handleGoogleAccount}
                disabled={isPending || isDisabled}
              >
                {!isAccountLinked
                  ? config.connectAccount
                  : config.disconnectAccount}
              </Button>

              <Button
                className="delete-user-button"
                clickContent={handleDeleteUser}
                disabled={isPending || isDisabled}
              >
                {config.deleteUser}
              </Button>
            </ButtonFullScreenContainer>
          </div>
        ) : (
          <MainLoader />
        )}

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
