/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useEffect, useMemo, useState } from 'react';
import { useSession } from 'next-auth/react';
import { getUserRole } from '@/src/lib/auth/getUserRoleServerAction';
import useFetchAllUserOrders from '@/src/hooks/order/useFetchAllUserOrders';
import useFetchAllTokens from '@/src/hooks/token/useFetchAllTokens';
import useFetchAllUsers from '@/src/hooks/user/useFetchAllUsers';
import { AuthRoleEnum } from '@/src/enums';
import * as t from '@/src/types';

export type DashboardContextProps = {
  users: t.User[] | null;
  userId: string | null;
  currentUser: string;
  isAdmin: boolean;
  updatedTokens: t.Token[] | null;
  userOrders: t.StrategyOrders | null;
  toggleUser: (currentUser: string) => void;
};

const initContext: DashboardContextProps = {
  users: [],
  userId: '',
  currentUser: '',
  isAdmin: false,
  updatedTokens: null,
  userOrders: null,
  toggleUser: () => {},
};

const DashboardContext = createContext<DashboardContextProps>(initContext);

export const DashboardProvider = ({ children }: t.ChildrenProps & {}) => {
  const [currentUser, setCurrentUser] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const { data: session } = useSession();
  const userId = session?.user?.id || null;

  useEffect(() => {
    if (userId) setCurrentUser(userId);
  }, [userId]);

  useEffect(() => {
    getUserRole(currentUser).then((res) => {
      setIsAdmin(res?.role === AuthRoleEnum.Admin);
    });
  }, [currentUser]);

  const enabledOrders = { enabled: !!userId };
  const enabledUsers = { enabled: isAdmin };

  const { userOrders } = useFetchAllUserOrders(currentUser, enabledOrders);
  const { users } = useFetchAllUsers(enabledUsers);
  const { updatedTokens } = useFetchAllTokens();

  const toggleUser = (currentUser: string) => {
    if (!users) return;
    for (let i = 0; i < users.length; i++) {
      const element = users[i];
      if (element.id === currentUser) {
        if (users.length - 1 === i) {
          const id = users[0].id;
          setCurrentUser(id);
        } else {
          const idx = users.findIndex((item) => item.id === element.id);
          const id = users[idx + 1].id;
          setCurrentUser(id);
        }
      }
    }
  };

  const values = useMemo(() => {
    return {
      isAdmin,
      users: users ?? null,
      userId,
      currentUser,
      updatedTokens,
      userOrders: userOrders || null,
      toggleUser,
    };
  }, [userId, updatedTokens, userOrders, currentUser, isAdmin]);

  return (
    <DashboardContext.Provider value={values}>
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardContext;
