/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useEffect, useMemo, useState } from 'react';
// import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import useFetchAllUsers from '@/src/hooks/user/useFetchAllUsers';
import useUpdatePrices from '@/src/hooks/token/useUpdatePrices';
import { chartService } from '@/src/services/chart.service';
import * as t from '@/src/types';
// import { getUserRole } from '../lib/auth/getUserRoleServerAction';

type SortTokens = (a: t.Token, b: t.Token) => number;

const c = {
  appVersion: 'v1.5.31',
  adminPath: '/admin',
  chartPath: '/chart',
  dashboardPath: '/dashboard',
  strategyPath: '/strategy/',
  initDelay: 2000,
  cronDelay: 120000,
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
  // userRole: string;
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
  // userRole: '',
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
  const [fearAndGreed, setFearAndGreed] = useState(0);
  const [unrealized, setUnrealized] = useState(0);
  const [users, setUsers] = useState<t.User[] | null>(null);
  // const [userRole, setUserRole] = useState('');
  const [count, setCount] = useState<number>(0);

  const { mutate: updatePrices } = useUpdatePrices();
  const { users: allUsers = null } = useFetchAllUsers({ enabled: !users });
  const { data: session } = useSession();

  // const path = usePathname();

  const userId = session?.user?.id || null;
  const app = { version: c.appVersion };
  // const isDashboard = path === c.dashboardPath;
  // const isStrategy = path.includes(c.strategyPath);

  useEffect(() => {
    const initTimeoutId = setTimeout(() => {
      // console.log('useEffect []:', count);
      // /*
      if (updatedTokens === null) {
        fetchTokens();
      }
      // */
    }, c.initDelay);

    /* // User Role
    if (!userRole) {
      getUserRole().then((res) => {
        if (res) {
          console.log('res?.role:', res?.role);
          setUserRole(res?.role);
        }
      });
    }
    */

    // Fear and Greed
    chartService.fetchFearAndGreedIndex().then((idx) => {
      if (idx) setFearAndGreed(idx);
    });
    return () => clearTimeout(initTimeoutId);
  }, []);

  // useEffect(() => {
  //     getUserRole().then((res) => {
  //       if (res) {
  //         setUserRole(res?.role);
  //       }
  //     });
  //   }, []);

  useEffect(() => {
    if (!users && allUsers) {
      setUsers(allUsers);
    }
  }, [allUsers]);

  // console.log('userRole:', userRole);

  useEffect(() => {
    // if (window.location.hostname === 'localhost') return;
    const timeoutId = setTimeout(() => {
      // if (isDashboard || isStrategy) {
      updateTokens(c.updatePrices);
      // console.log('useEffect [count]:', count);
      setCount((prev) => prev + 1);
      // }
    }, c.cronDelay);
    return () => clearTimeout(timeoutId);
  }, [count]);

  // ---

  const handleUnrealized = (val: number) => setUnrealized(val);

  const updateTokens = (msg: string) => {
    const param = {};
    // console.log('updateTokens:', count);
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
  };

  const fetchTokens = () => {
    setIsTokenLoading(true);
    updateTokens(c.fetchTokens);
    setIsTokenLoading(false);
    // console.log('fetchTokens:', count);
    setCount((prev) => prev + 1);
  };

  const values = useMemo(() => {
    return {
      // count,
      app,
      isTokenLoading,
      updatedTokens,
      users,
      // userRole,
      fearAndGreed,
      unrealized,
      fetchTokens,
      handleUnrealized,
    };
  }, [userId, updatedTokens, unrealized]);

  return (
    <GlobalContext.Provider value={values}>{children}</GlobalContext.Provider>
  );
};

export default GlobalContext;
