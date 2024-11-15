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
// import SwitchIcon from '@/src/assets/icons/SwitchIcon';
// import MockDataList from '../MockDataList';

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
              <OptionSection name={'Name'} value={username} mutable />
              <OptionSection name={'Email'} value={email ?? '...'} />
            </SectionsContainer>

            <MainDividerSection
              isDisabled={isDisabled}
              setIsDisabled={setIsDisabled}
            />

            <ButtonFullScreenContainer>
              <Button
                clickContent={handleGoogleAccount}
                disabled={isPending || isDisabled}
              >
                {!isAccountLinked
                  ? config.connectAccount
                  : config.disconnectAccount}
              </Button>

              <Button
                clickContent={handleSignOut}
                disabled={isPending || isDisabled}
              >
                {config.signOut}
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
