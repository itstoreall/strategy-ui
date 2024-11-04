'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { handleSignOut } from '@/src/lib/auth/signOutServerAction';
import { getUserName } from '@/src/lib/auth/getUserNameServerAction';
import { getUserRole } from '@/src/lib/auth/getUserRoleServerAction';
import { getAccountLinkStatus } from '@/src/lib/auth/getAccountLinkStatusServerAction';
import { unlinkGoogleAccount } from '@/src/lib/auth/unlinkGoogleAccountServerAction';
import { handleGoogleSignIn } from '@/src/lib/auth/googleSignInServerAction';
import Container, { Label } from '@/src/components/Container/Page';
import BlockColumn from '@/src/components/BlockColumn';
import Button from '@/src/components/Button/Button';
import Title from '@/src/components/Layout/Title';

const Settings = () => {
  const [isAccountLinked, setIsAccountLinked] = useState(false);
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');

  const session = useSession();
  const isAuth = session.status === 'authenticated';

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
    if (isAccountLinked) {
      await unlinkGoogleAccount().then(({ unlinked }) => {
        console.log('unlinked:::', unlinked);
        setIsAccountLinked(false);
      });
    } else {
      await handleGoogleSignIn().then(() => {
        setIsAccountLinked(true);
      });
    }
  };

  return (
    <Container label={Label.Main}>
      <main className="main">
        <Title tag={'h2'} text={'Settings'} />

        <p>{'Settings'}</p>

        {isAuth && <Button clickContent={handleSignOut}>Log Out</Button>}

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
          </div>

          <BlockColumn gap={'1rem'}>
            <Button clickContent={handleGoogleAccount}>
              {!isAccountLinked
                ? 'Connect Google Account'
                : 'Disconnect Google Account'}
            </Button>
          </BlockColumn>
        </div>
      </main>
    </Container>
  );
};

export default Settings;
