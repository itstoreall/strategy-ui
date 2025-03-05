/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useEffect, useMemo } from 'react';
import { useSession } from 'next-auth/react';
import useFetchAllTokens from '@/src/hooks/token/useFetchAllTokens';
import * as t from '@/src/types';

export type GlobalContextProps = {
  updatedTokens: t.Token[] | null;
  fetchTokens: () => void;
};

const initContext: GlobalContextProps = {
  updatedTokens: null,
  fetchTokens: () => {},
};

const GlobalContext = createContext<GlobalContextProps>(initContext);

export const GlobalProvider = ({ children }: t.ChildrenProps & {}) => {
  const { updatedTokens, fetchTokens } = useFetchAllTokens();
  const { data: session } = useSession();

  const userId = session?.user?.id || null;

  useEffect(() => {
    if (!updatedTokens) {
      fetchTokens();
    }
  }, [updatedTokens]);

  const values = useMemo(() => {
    return {
      updatedTokens,
      fetchTokens,
    };
  }, [userId, updatedTokens, fetchTokens]);

  return (
    <GlobalContext.Provider value={values}>{children}</GlobalContext.Provider>
  );
};

export default GlobalContext;
