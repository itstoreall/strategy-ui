/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { Token } from '@/src/types';
import useUpdatePrices from '@/src/hooks/token/useUpdatePrices';
import { usePathname } from 'next/navigation';

type SortTokens = (a: Token, b: Token) => number;

const sortById: SortTokens = (a, b) => a.id - b.id;

const useFetchAllTokens = () => {
  const { mutate: updatePrices } = useUpdatePrices();
  const [updatedTokens, setUpdatedTokens] = useState<Token[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const path = usePathname();

  console.log('path:', path);

  const fetchTokens = () => {
    const params = {};
    setIsLoading(true);
    updatePrices(params, {
      onSuccess: (data) => {
        console.log('fetch was successful');
        setUpdatedTokens(data.tokens.sort(sortById));
        setIsLoading(false);
      },
      onError: (error) => {
        console.log('fetch failed');
        console.error('ERROR in updating prices (Dashboard):', error);
        setIsLoading(false);
      },
    });
  };

  useEffect(() => {
    fetchTokens();
  }, [path]);

  return { updatedTokens, isLoading, fetchTokens };
};

export default useFetchAllTokens;
