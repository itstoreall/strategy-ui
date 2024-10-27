'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { getAccountLinkStatus } from '@/src/lib/auth/getAccountLinkStatusServerAction';
import { unlinkGoogleAccount } from '@/src/lib/auth/unlinkGoogleAccountServerAction';
import { handleGoogleSignIn } from '@/src/lib/auth/googleSignInServerAction';
import { getUserName } from '@/src/lib/auth/getUserNameServerAction';
import { getUserRole } from '@/src/lib/auth/getUserRoleServerAction';
import { handleSignOut } from '@/src/lib/auth/signOutServerAction';
import BlockColumn from '@/src/components/BlockColumn';
import Button from '@/src/components/Button';

export const DashboardPage: React.FC = () => {
  const [isAccountLinked, setIsAccountLinked] = useState(false);
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');

  const { update } = useSession();

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
    <div className="dashboard-page">
      <h2>Dashboard</h2>
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
            clickContent={() => update({ name: username })}
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
          <Button clickContent={handleSignOut}>Log Out</Button>
        </BlockColumn>
      </div>
    </div>
  );
};
