/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useEffect, useMemo, useState } from 'react';
import { useSession } from 'next-auth/react';
// import useFetchAllTokens from '@/src/hooks/token/useFetchAllTokens';
import * as t from '@/src/types';
import useUpdatePrices from '../hooks/token/useUpdatePrices';

type SortTokens = (a: t.Token, b: t.Token) => number;

export type GlobalContextProps = {
  updatedTokens: t.Token[] | null;
  fetchTokens: () => void;
};

const initContext: GlobalContextProps = {
  updatedTokens: null,
  fetchTokens: () => {},
};

const GlobalContext = createContext<GlobalContextProps>(initContext);
const sortById: SortTokens = (a, b) => a.id - b.id;

export const GlobalProvider = ({ children }: t.ChildrenProps & {}) => {
  // const { updatedTokens, fetchTokens } = useFetchAllTokens();
  const [updatedTokens, setUpdatedTokens] = useState<t.Token[] | null>(null);

  const { mutate: updatePrices } = useUpdatePrices();
  const { data: session } = useSession();

  const userId = session?.user?.id || null;

  const fetchTokens = () => {
    const params = {};
    updatePrices(params, {
      onSuccess: (data) => {
        console.log('fetch was successful');
        setUpdatedTokens(data.tokens.sort(sortById));
        // setIsLoading(false);
      },
      onError: (error) => {
        console.log('fetch failed');
        console.error('ERROR in updating prices (Dashboard):', error);
        // setIsLoading(false);
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
      updatedTokens,
      fetchTokens,
    };
  }, [userId, updatedTokens, fetchTokens]);

  return (
    <GlobalContext.Provider value={values}>{children}</GlobalContext.Provider>
  );
};

export default GlobalContext;
