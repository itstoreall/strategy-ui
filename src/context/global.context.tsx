/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useEffect, useMemo, useState } from 'react';
import { useSession } from 'next-auth/react';
import useFetchAllUsers from '@/src/hooks/user/useFetchAllUsers';
import useUpdatePrices from '@/src/hooks/token/useUpdatePrices';
import { chartService } from '@/src/services/chart.service';
import * as t from '@/src/types';

type SortTokens = (a: t.Token, b: t.Token) => number;

const appVersion = 'v1.3.31';

export type GlobalContextProps = {
  app: { version: string };
  updatedTokens: t.Token[] | null;
  users: t.User[] | null;
  fearAndGreed: number;
  fetchTokens: () => void;
};

const initContext: GlobalContextProps = {
  app: { version: '' },
  updatedTokens: null,
  users: null,
  fearAndGreed: 0,
  fetchTokens: () => {},
};

const GlobalContext = createContext<GlobalContextProps>(initContext);
const sortById: SortTokens = (a, b) => a.id - b.id;

export const GlobalProvider = ({ children }: t.ChildrenProps & {}) => {
  const [updatedTokens, setUpdatedTokens] = useState<t.Token[] | null>(null);
  const [isTokenLoading, setIsTokenLoading] = useState<boolean>(false);
  const [fearAndGreed, setFearAndGreed] = useState(0);

  const { mutate: updatePrices } = useUpdatePrices();
  const { users = null } = useFetchAllUsers({ enabled: true });
  const { data: session } = useSession();

  const userId = session?.user?.id || null;
  const app = { version: appVersion };

  const fetchTokens = () => {
    const params = {};
    setIsTokenLoading(true);
    updatePrices(params, {
      onSuccess: (data) => {
        console.log('Fetch was successful:', data.tokens.length, 'tokens');
        setUpdatedTokens(data.tokens.sort(sortById));
      },
      onError: (error) => {
        console.error('ERROR in updating prices (Dashboard):', error);
      },
    });
    setIsTokenLoading(false);
  };

  // ---

  useEffect(() => {
    chartService.fetchFearAndGreedIndex().then((idx) => {
      if (idx) setFearAndGreed(idx);
    });
  }, []);

  useEffect(() => {
    if (!updatedTokens) {
      fetchTokens();
    }
  }, [updatedTokens]);

  const values = useMemo(() => {
    return {
      app,
      isTokenLoading,
      updatedTokens,
      users,
      fearAndGreed,
      fetchTokens,
    };
  }, [userId, updatedTokens, fetchTokens]);

  return (
    <GlobalContext.Provider value={values}>{children}</GlobalContext.Provider>
  );
};

export default GlobalContext;
