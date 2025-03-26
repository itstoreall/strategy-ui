/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useEffect, useMemo, useState } from 'react';
import { useSession } from 'next-auth/react';
import useFetchAllUsers from '@/src/hooks/user/useFetchAllUsers';
import useUpdatePrices from '@/src/hooks/token/useUpdatePrices';
import * as t from '@/src/types';

type SortTokens = (a: t.Token, b: t.Token) => number;

const appVersion = 'v1.3.9';

export type GlobalContextProps = {
  updatedTokens: t.Token[] | null;
  users: t.User[] | null;
  fetchTokens: () => void;
  app: { version: string };
};

const initContext: GlobalContextProps = {
  updatedTokens: null,
  users: null,
  fetchTokens: () => {},
  app: { version: '' },
};

const GlobalContext = createContext<GlobalContextProps>(initContext);
const sortById: SortTokens = (a, b) => a.id - b.id;

export const GlobalProvider = ({ children }: t.ChildrenProps & {}) => {
  const [updatedTokens, setUpdatedTokens] = useState<t.Token[] | null>(null);
  const [isTokenLoading, setIsTokenLoading] = useState<boolean>(false);

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
        console.log('fetch was successful');
        setUpdatedTokens(data.tokens.sort(sortById));
        setIsTokenLoading(false);
      },
      onError: (error) => {
        console.log('fetch failed');
        console.error('ERROR in updating prices (Dashboard):', error);
        setIsTokenLoading(false);
      },
    });
  };

  useEffect(() => {
    if (!updatedTokens) {
      fetchTokens();
    }
  }, [updatedTokens]);

  const values = useMemo(() => {
    return {
      isTokenLoading,
      updatedTokens,
      users,
      fetchTokens,
      app,
    };
  }, [userId, updatedTokens, fetchTokens]);

  return (
    <GlobalContext.Provider value={values}>{children}</GlobalContext.Provider>
  );
};

export default GlobalContext;
