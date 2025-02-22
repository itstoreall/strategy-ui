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
  updatedTokens: t.Token[] | null;
  userOrders: t.StrategyOrders | null;
  currentUser: string;
  toggleUser: (currentUser: string) => void;
};

const initContext: DashboardContextProps = {
  users: [],
  userId: '',
  updatedTokens: null,
  userOrders: null,
  currentUser: '',
  toggleUser: () => {},
};

const DashboardContext = createContext<DashboardContextProps>(initContext);

export const DashboardProvider = ({ children }: t.ChildrenProps & {}) => {
  const [currentUser, setCurrentUser] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const { data: session } = useSession();
  const userId = session?.user?.id || null;

  useEffect(() => {
    getUserRole().then((res) => {
      if (res?.role === AuthRoleEnum.Admin) setIsAdmin(true);
    });
  }, []);

  useEffect(() => {
    if (userId) setCurrentUser(userId);
  }, [userId]);

  const { userOrders } = useFetchAllUserOrders(currentUser, {
    enabled: !!userId,
  });
  const { users } = useFetchAllUsers({ enabled: isAdmin });
  const { updatedTokens } = useFetchAllTokens();

  const toggleUser = (currentUser: string) => {
    if (!users) return;
    for (let i = 0; i < users.length; i++) {
      const element = users[i];
      if (element.id === currentUser) {
        if (users.length - 1 === i) {
          setCurrentUser(users[0].id);
        } else {
          setCurrentUser(users[i++].id);
        }
      }
    }
  };

  const values = useMemo(() => {
    return {
      users: users ?? null,
      userId,
      updatedTokens,
      userOrders: userOrders || null,
      currentUser,
      toggleUser,
    };
  }, [userId, updatedTokens, userOrders, currentUser]);

  return (
    <DashboardContext.Provider value={values}>
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardContext;
