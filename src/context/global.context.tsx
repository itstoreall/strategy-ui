/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useEffect, useMemo, useState } from 'react';
import { useSession } from 'next-auth/react';
import useFetchAllUsers from '@/src/hooks/user/useFetchAllUsers';
import useUpdatePrices from '@/src/hooks/token/useUpdatePrices';
import { chartService } from '@/src/services/chart.service';
import * as t from '@/src/types';

type SortTokens = (a: t.Token, b: t.Token) => number;

const config = {
  appVersion: 'v1.3.48',
  fetch: 'Fetch was successful:',
  refetch: 'refetching tokens...',
  errUpdatePrices: 'ERROR in updating prices:',
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

  const { mutate: updatePrices } = useUpdatePrices();
  const { users = null } = useFetchAllUsers({ enabled: true });
  const { data: session } = useSession();

  const userId = session?.user?.id || null;
  const app = { version: config.appVersion };

  useEffect(() => {
    setTimeout(() => {
      if (updatedTokens === null) {
        console.log(config.refetch);
        fetchTokens();
      }
    }, 2000);

    // Fear and Greed
    chartService.fetchFearAndGreedIndex().then((idx) => {
      if (idx) setFearAndGreed(idx);
    });
  }, []);

  const [i, setI] = useState<number>(0);
  useEffect(() => {
    // console.log(i);
    const timeoutId = setTimeout(() => {
      updatePrices(
        {},
        {
          onSuccess: (data) => {
            console.log(config.fetch, data.tokens.length, 'tokens');
            setUpdatedTokens(data.tokens.sort(sortById));
          },
          onError: (error) => {
            console.error(config.errUpdatePrices, error);
          },
        }
      );
      setI((prev) => prev + 1);
    }, 60000);
    return () => clearTimeout(timeoutId);
  }, [i]);

  const handleUnrealized = (val: number) => setUnrealized(val);

  const fetchTokens = () => {
    setIsTokenLoading(true);
    updatePrices(
      {},
      {
        onSuccess: (data) => {
          console.log(config.fetch, data.tokens.length, 'tokens');
          setUpdatedTokens(data.tokens.sort(sortById));
        },
        onError: (error) => {
          console.error(config.errUpdatePrices, error);
        },
      }
    );
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
