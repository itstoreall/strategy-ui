import { useEffect, useState, useTransition } from 'react';
import { SessionContextValue, useSession } from 'next-auth/react';
import useModal from '@/src/hooks/useModal';
import { handleSignOut } from '@/src/lib/auth/signOutServerAction';
import { getUserName } from '@/src/lib/auth/getUserNameServerAction';
import { getUserRole } from '@/src/lib/auth/getUserRoleServerAction';
import { getAccountLinkStatus } from '@/src/lib/auth/getAccountLinkStatusServerAction';
import { unlinkGoogleAccount } from '@/src/lib/auth/unlinkGoogleAccountServerAction';
import { deleteUserServerAction } from '@/src/lib/auth/deleteUserServerAction';
import { handleGoogleSignIn } from '@/src/lib/auth/googleSignInServerAction';

const useSettings = (session: SessionContextValue) => {
  const [isAccountLinked, setIsAccountLinked] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'USER' | 'ADMIN' | ''>('');
  const [isPending, startTransition] = useTransition();

  const { closeModal } = useModal();
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
    if (session?.data?.user?.email) {
      setEmail(session.data.user.email);
    }
  }, [session]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!isAuth || !username || !role) {
        console.log('..reject');
        handleSignOut();
      }
    }, 15000);
    return () => clearTimeout(timeoutId);
  }, [isAuth, username, role]);

  const handleUpdateUsername = () => {
    update({ name: username });
    closeModal();
  };

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

  const handleDeleteUser = async () => {
    if (session.data?.user?.id) {
      const res = await deleteUserServerAction(session.data?.user?.id);
      if (res && res.deleted) {
        handleSignOut();
      }
    }
  };

  return {
    role,
    email,
    isAuth,
    username,
    isPending,
    isAccountLinked,
    setUsername,
    handleGoogleAccount,
    handleUpdateUsername,
    handleDeleteUser,
  };
};

export default useSettings;
