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

const c = {
  pageTitle: 'Settings',
  connectAccount: 'Connect Google Account',
  signOut: 'Sign Out',
  enableTakeProfit: 'Enable Take Profit',
  disableTakeProfit: 'Disable Take Profit',
  disconnectAccount: 'Disconnect Google Account',
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
    takeProfit,
    isPending,
    isAccountLinked,
    setUsername,
    handleTakeProfit,
    handleUpdateUsername,
    handleGoogleAccount,
    handleDeleteUser,
  } = useSettings(session);

  const { RenderModal } = useModal();

  const [isDisabled, setIsDisabled] = useState(true);

  return (
    <PageContainer label={Label.Main}>
      <main className="main">
        <PageHeading title={c.pageTitle} role={role} />

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
                {c.signOut}
              </Button>

              <Button
                clickContent={handleTakeProfit}
                disabled={isPending || isDisabled}
              >
                {takeProfit ? c.disableTakeProfit : c.enableTakeProfit}
              </Button>

              <Button
                clickContent={handleGoogleAccount}
                disabled={isPending || isDisabled}
              >
                {!isAccountLinked ? c.connectAccount : c.disconnectAccount}
              </Button>

              <Button
                className="delete-user-button"
                clickContent={handleDeleteUser}
                disabled={true}
                // disabled={isPending || isDisabled}
              >
                {c.deleteUser}
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
