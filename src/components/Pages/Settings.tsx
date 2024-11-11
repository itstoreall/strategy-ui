/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import { useEffect, useState, useTransition } from 'react';
import { SessionContextValue, useSession } from 'next-auth/react';
import { handleSignOut } from '@/src/lib/auth/signOutServerAction';
import { getUserName } from '@/src/lib/auth/getUserNameServerAction';
import { getUserRole } from '@/src/lib/auth/getUserRoleServerAction';
import { getAccountLinkStatus } from '@/src/lib/auth/getAccountLinkStatusServerAction';
import { unlinkGoogleAccount } from '@/src/lib/auth/unlinkGoogleAccountServerAction';
import { handleGoogleSignIn } from '@/src/lib/auth/googleSignInServerAction';
import EditUsernameForm from '@/src/components/Form/EditUsernameForm';
import PageContainer, { Label } from '@/src/components/Container/Page';
import PageHeading from '@/src/components/Layout/PageHeading';
import OptionSection from '../Section/OptionSection';
import Button from '@/src/components/Button/Button';
import MainLoader from '../MainLoader';
import useModal from '@/src/hooks/useModal';
// import MockDataList from '../MockDataList';

type Props = { session: SessionContextValue };

const Settings = ({ session }: Props) => {
  const [isAccountLinked, setIsAccountLinked] = useState(false);
  const [username, setUsername] = useState('');
  const [role, setRole] = useState<'USER' | 'ADMIN' | ''>('');
  const [isPending, startTransition] = useTransition();

  const { RenderModal } = useModal();

  const { update } = useSession();

  const isAuth = session.status === 'authenticated';

  useEffect(() => {
    const userInfo = async () => {
      const name = await getUserName();
      if (name) {
        setUsername(name);
      }

      const roleRes = await getUserRole();
      if (roleRes?.role) {
        setRole(roleRes?.role);
      }
    };

    const accountLinkStatus = async () => {
      try {
        const { status } = await getAccountLinkStatus();
        setIsAccountLinked(status);
      } catch (error) {
        console.error('Failed to get account link status:', error);
      }
    };

    userInfo();
    accountLinkStatus();
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!isAuth || !username || !role) {
        console.log('..reject');
        handleSignOut();
      }
    }, 15000);
    return () => clearTimeout(timeoutId);
  }, [isAuth, username, role]);

  const handleGoogleAccount = async () => {
    startTransition(async () => {
      if (isAccountLinked) {
        await unlinkGoogleAccount().then(({ unlinked }) => {
          console.log('unlinked:::', unlinked);
          setIsAccountLinked(false);
        });
      } else {
        await handleGoogleSignIn('settings').then(() => {
          setIsAccountLinked(true);
        });
      }
    });
  };

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
            update={update}
          />
        </RenderModal>
      </main>
    </PageContainer>
  );
};

export default Settings;
