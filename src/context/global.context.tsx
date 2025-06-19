/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useEffect, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import useFetchAllUsers from '@/src/hooks/user/useFetchAllUsers';
import useUpdatePrices from '@/src/hooks/token/useUpdatePrices';
import { chartService } from '@/src/services/chart.service';
import * as t from '@/src/types';

type SortTokens = (a: t.Token, b: t.Token) => number;

const c = {
  appVersion: 'v1.5.25',
  adminPath: '/admin',
  chartPath: '/chart',
  dashboardPath: '/dashboard',
  strategyPath: '/strategy/',
  initDelay: 2000,
  cronDelay: 180000,
  fetchTokens: 'Fetch was successful:',
  updatePrices: 'Prices updated successfully:',
  refetch: 'refetching tokens...',
  errUpdatePrices: 'ERROR in updating prices:',
  tokens: 'tokens',
};

export type GlobalContextProps = {
  app: { version: string };
  updatedTokens: t.Token[] | null;
  users: t.User[] | null;
  fearAndGreed: number;
  unrealized: number;
  fetchTokens: () => void;
  handleUnrealized: (val: number) => void;
};

const initContext: GlobalContextProps = {
  app: { version: '' },
  updatedTokens: null,
  users: null,
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
  const [count, setCount] = useState<number>(0);

  const { mutate: updatePrices } = useUpdatePrices();
  const { users = null } = useFetchAllUsers({ enabled: true });
  const { data: session } = useSession();

  const path = usePathname();

  const userId = session?.user?.id || null;
  const app = { version: c.appVersion };
  const isDashboard = path === c.dashboardPath;
  const isStrategy = path.includes(c.strategyPath);

  useEffect(() => {
    setTimeout(() => {
      if (updatedTokens === null) {
        fetchTokens();
      }
    }, c.initDelay);

    // Fear and Greed
    chartService.fetchFearAndGreedIndex().then((idx) => {
      if (idx) setFearAndGreed(idx);
    });
  }, []);

  useEffect(() => {
    if (window.location.hostname === 'localhost') return;
    const timeoutId = setTimeout(() => {
      if (isDashboard || isStrategy) {
        updateTokens(c.updatePrices);
      }
    }, c.cronDelay);
    return () => clearTimeout(timeoutId);
  }, [count]);

  // ---

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
    console.log(count);
    setCount((prev) => prev + 1);
  };

  const fetchTokens = () => {
    setIsTokenLoading(true);
    updateTokens(c.fetchTokens);
    setIsTokenLoading(false);
  };

  const values = useMemo(() => {
    return {
      app,
      isTokenLoading,
      updatedTokens,
      users,
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
