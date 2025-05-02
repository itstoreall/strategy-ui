/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useEffect, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import useFetchAllUsers from '@/src/hooks/user/useFetchAllUsers';
import useUpdatePrices from '@/src/hooks/token/useUpdatePrices';
import { chartService } from '@/src/services/chart.service';
import * as t from '@/src/types';

type SortTokens = (a: t.Token, b: t.Token) => number;

const config = {
  appVersion: 'v1.4.35',
  dashboardPath: '/dashboard',
  strategyPath: '/strategy/',
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
  const app = { version: config.appVersion };
  const isDashboard = path === config.dashboardPath;
  const isStrategy = path.includes(config.strategyPath);

  useEffect(() => {
    setTimeout(() => {
      if (updatedTokens === null) {
        fetchTokens();
      }
    }, 2000);

    // Fear and Greed
    chartService.fetchFearAndGreedIndex().then((idx) => {
      if (idx) setFearAndGreed(idx);
    });
  }, []);

  useEffect(() => {
    const init = 5000;
    const cron = 60000;
    const delay = count < 3 ? init : cron;
    const timeoutId = setTimeout(() => {
      if (isDashboard || isStrategy) {
        if (count >= 2) {
          if (!updatedTokens) {
            updateTokens(config.updatePrices);
          } else {
            if (delay === cron) {
              updateTokens(config.updatePrices);
            }
          }
        }
      }
      setCount((prev) => prev + 1);
    }, delay);
    return () => clearTimeout(timeoutId);
  }, [count]);

  // ---

  const handleUnrealized = (val: number) => setUnrealized(val);

  const updateTokens = (msg: string) => {
    const param = {};
    updatePrices(param, {
      onSuccess: (data) => {
        if (data?.tokens?.length) {
          console.log(msg, data.tokens.length, config.tokens);
          setUpdatedTokens(data.tokens.sort(sortById));
        }
      },
      onError: (error) => {
        console.error(config.errUpdatePrices, error);
      },
    });
  };

  const fetchTokens = () => {
    setIsTokenLoading(true);
    updateTokens(config.fetchTokens);
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
