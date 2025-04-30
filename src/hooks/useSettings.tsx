import { useEffect, useState, useTransition } from 'react';
import { SessionContextValue } from 'next-auth/react';
import { handleSignOut } from '@/src/lib/auth/signOutServerAction';
import { getUserName } from '@/src/lib/auth/getUserNameServerAction';
import { getUserRole } from '@/src/lib/auth/getUserRoleServerAction';
import { getAccountLinkStatus } from '@/src/lib/auth/getAccountLinkStatusServerAction';
import { unlinkGoogleAccount } from '@/src/lib/auth/unlinkGoogleAccountServerAction';
import { handleGoogleSignIn } from '@/src/lib/auth/googleSignInServerAction';
import useModal from '@/src/hooks/useModal';
import { Role } from '@/src/types';
/*
import { deleteUser } from '@/src/lib/auth/deleteUserServerAction';
*/

const c = {
  authStatus: 'authenticated',
  lsTakeProfitKey: 'takeProfit',
  confirmDelete: 'This Account will be deleted!',
  reject: '..reject',
  unlink: 'unlinked:::',
  errLink: 'Failed to get account link status:',
};

const useSettings = (session: SessionContextValue) => {
  const [isPending, startTransition] = useTransition();
  const [isAccountLinked, setIsAccountLinked] = useState(false);
  const [userId, setUserId] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<Role>('');

  const [takeProfit, setTakeProfit] = useState<boolean>(() =>
    JSON.parse(localStorage.getItem(c.lsTakeProfitKey) || 'false')
  );

  const { closeModal } = useModal();

  const isAuth = session.status === c.authStatus;

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
        console.error(c.errLink, error);
      }
    };

    userInfo();
    accountLinkStatus();
  }, []);

  useEffect(() => {
    // if (session?.data?.user?.email) {
    //   setEmail(session.data.user.email);
    // }

    setEmail(session?.data?.user?.email || '');
    setUserId(session?.data?.user?.id || '');
  }, [session]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!isAuth || !username || !role) {
        console.log(c.reject);
        handleSignOut();
      }
    }, 15000);
    return () => clearTimeout(timeoutId);
  }, [isAuth, username, role]);

  const handleUpdateUsername = () => {
    session.update({ name: username });
    closeModal();
  };

  const handleTakeProfit = () => {
    setTakeProfit((prev) => {
      const newValue = !prev;
      localStorage.setItem(c.lsTakeProfitKey, JSON.stringify(newValue));
      return newValue;
    });
  };

  const handleGoogleAccount = async () => {
    startTransition(async () => {
      if (isAccountLinked) {
        await unlinkGoogleAccount().then(({ unlinked }) => {
          console.log(c.unlink, unlinked);
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
      if (confirm(c.confirmDelete)) {
        /*
        const res = await deleteUser(session.data?.user?.id);
        if (res && res.deleted) {
          handleSignOut();
        }
        */
      }
    }
  };

  return {
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
  };
};

export default useSettings;
