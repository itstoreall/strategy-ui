/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useEffect, useMemo, useState } from 'react';
import { useSession } from 'next-auth/react';
import { updateDBSession } from '@/src/lib/auth/updateDBSessionServerAction';
import { createDBSession } from '@/src/lib/auth/createDBSession';
import { getDBSession } from '@/src/lib/auth/getDBSessionServerAction';
import useFetchAllUsers from '@/src/hooks/user/useFetchAllUsers';
import useUpdatePrices from '@/src/hooks/token/useUpdatePrices';
import { chartService } from '@/src/services/chart.service';
import * as t from '@/src/types';

type SortTokens = (a: t.Token, b: t.Token) => number;

const c = {
  appVersion: 'v1.5.51',
  adminPath: '/admin',
  chartPath: '/chart',
  dashboardPath: '/dashboard',
  strategyPath: '/strategy/',
  initDelay: 2000,
  cronDelay: 60000,
  fetchTokens: 'Fetch was successful:',
  updatePrices: 'Prices updated successfully:',
  refetch: 'refetching tokens...',
  errUpdatePrices: 'ERROR in updating prices:',
  tokens: 'tokens',
};

export type GlobalContextProps = {
  // count: number;
  app: { version: string };
  updatedTokens: t.Token[] | null;
  users: t.User[] | null;
  userRole: string;
  fearAndGreed: number;
  unrealized: number;
  fetchTokens: () => void;
  handleUnrealized: (val: number) => void;
};

const initContext: GlobalContextProps = {
  // count: 0,
  app: { version: '' },
  updatedTokens: null,
  users: null,
  userRole: '',
  fearAndGreed: 0,
  unrealized: 0,
  fetchTokens: () => {},
  handleUnrealized: () => {},
};

const GlobalContext = createContext<GlobalContextProps>(initContext);
const sortById: SortTokens = (a, b) => a.id - b.id;

export const GlobalProvider = ({ children }: t.ChildrenProps & {}) => {
  const [updatedTokens, setUpdatedTokens] = useState<t.Token[] | null>(null);
  const [isTokenLoading, setIsTokenLoading] = useState<boolean>(false);
  const [isUpdatedSession, setIsUpdatedSession] = useState(false);
  const [fearAndGreed, setFearAndGreed] = useState(0);
  const [unrealized, setUnrealized] = useState(0);
  const [users, setUsers] = useState<t.User[] | null>(null);
  const [userRole, setUserRole] = useState('');
  const [count, setCount] = useState<number>(0);

  const { mutate: updatePrices } = useUpdatePrices();
  const { users: allUsers = null } = useFetchAllUsers({ enabled: !users });
  const { data: session } = useSession();

  const userId = session?.user?.id || null;
  const app = { version: c.appVersion };

  useEffect(() => {
    const initTimeoutId = setTimeout(() => {
      fetchTokens();
    }, c.initDelay);

    // Fear and Greed
    chartService.fetchFearAndGreedIndex().then((idx) => {
      if (idx) setFearAndGreed(idx);
    });
    return () => clearTimeout(initTimeoutId);
  }, []);

  useEffect(() => {
    if (window.location.hostname === 'localhost') return;
    const timeoutId = setTimeout(() => {
      updateTokens(c.updatePrices);
    }, c.cronDelay);
    return () => clearTimeout(timeoutId);
  }, [count]);

  useEffect(() => {
    handleDBSession();
    handleUserRole();
  }, [userId]);

  useEffect(() => {
    handleAllUsers();
  }, [allUsers]);

  useEffect(() => {
    handleUserRole();
  }, [users]);

  // ---

  const handleDBSession = () => {
    if (userId && !isUpdatedSession) {
      getDBSession(userId).then((res) => {
        const expires = new Date(Date.now() + 1000 * 60 * 60 * 24); // Extend the session by 1 day
        if (res) {
          updateDBSession(userId, { expires }).then((res) => {
            setIsUpdatedSession(!!res);
          });
        } else {
          createDBSession(userId, expires).then((res) => {
            setIsUpdatedSession(!!res);
          });
        }
      });
    }
  };

  const handleAllUsers = () => {
    if (!users && allUsers) {
      setUsers(allUsers);
    }
  };

  const handleUserRole = () => {
    if (!userRole && users && userId) {
      const user = users.find((user) => user.id === userId);
      if (user) {
        setUserRole(user.role);
      }
    }
  };

  const handleUnrealized = (val: number) => setUnrealized(val);

  const updateTokens = (msg: string) => {
    const param = {};
    updatePrices(param, {
      onSuccess: (data) => {
        if (data?.tokens?.length) {
          console.log(msg, data.tokens.length, c.tokens);
          setUpdatedTokens(data.tokens.sort(sortById));
        }
      },
      onError: (error) => {
        console.error(c.errUpdatePrices, error);
      },
    });
    setCount((prev) => prev + 1);
    handleUserRole();
    handleAllUsers();
  };

  const fetchTokens = () => {
    setIsTokenLoading(true);
    updateTokens(c.fetchTokens);
    setIsTokenLoading(false);
  };

  const values = useMemo(() => {
    return {
      // count,
      app,
      isTokenLoading,
      updatedTokens,
      users,
      userRole,
      fearAndGreed,
      unrealized,
      fetchTokens,
      handleUnrealized,
    };
  }, [userId, updatedTokens, userRole, unrealized]);

  return (
    <GlobalContext.Provider value={values}>{children}</GlobalContext.Provider>
  );
};

export default GlobalContext;
