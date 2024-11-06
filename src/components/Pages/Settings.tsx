'use client';

import { useEffect, useState, useTransition } from 'react';
import { SessionContextValue } from 'next-auth/react';
import { handleSignOut } from '@/src/lib/auth/signOutServerAction';
import { getUserName } from '@/src/lib/auth/getUserNameServerAction';
import { getUserRole } from '@/src/lib/auth/getUserRoleServerAction';
import { getAccountLinkStatus } from '@/src/lib/auth/getAccountLinkStatusServerAction';
import { unlinkGoogleAccount } from '@/src/lib/auth/unlinkGoogleAccountServerAction';
import { handleGoogleSignIn } from '@/src/lib/auth/googleSignInServerAction';
import Container, { Label } from '@/src/components/Container/Page';
import PageHeading from '@/src/components/Layout/PageHeading';
import OptionSection from '../Section/OptionSection';
import Button from '@/src/components/Button/Button';
import Loader from '../Loader';

type Props = { session: SessionContextValue };

const Settings = ({ session }: Props) => {
  const [isAccountLinked, setIsAccountLinked] = useState(false);
  const [username, setUsername] = useState('');
  const [role, setRole] = useState<'USER' | 'ADMIN' | ''>('');
  const [isPending, startTransition] = useTransition();

  const isAuth = session.status === 'authenticated';

  console.log('isAuth:', isAuth);

  useEffect(() => {
    const userInfo = async () => {
      const name = await getUserName();
      if (name) {
        setUsername(name);
      }

      const { role } = await getUserRole();
      if (role) {
        setRole(role);
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
    <Container label={Label.Main}>
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
          <div className="settings-loader-block">
            <Loader />
          </div>
        )}

        {/* 

        <div className="dashboard-card">
          <a href="/admin">Go to Admin Page</a>
          <div>
            <p>Role: {role}</p>
          </div>

          <div style={{ marginBottom: '20px' }} className="name">
            {username}
          </div>

          <div className="field-input-container">
            <input
              className="field-input"
              type="text"
              placeholder={'Enter name'}
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />

            <Button
              className="update-field-button"
              clickContent={() => session.update({ name: username })}
            >
              Update Name
            </Button>
          </div> */}
      </main>
    </Container>
  );
};

export default Settings;
