/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import useRemoveToken from '@/src/hooks/token/useRemoveToken';
import useGlobalState from '@/src/hooks/useGlobalState';
import { User } from '@/src/types';

const useAdmin = (users: User[] | null) => {
  const [userOptions, setUserOptions] = useState<string[]>([]);

  const { fetchTokens } = useGlobalState();
  const {
    mutate: deleteToken,
    isSuccess: isSuccessRemoveToken,
    isError: isErrorRemoveToken,
  } = useRemoveToken(fetchTokens);

  // ---

  useEffect(() => {
    if (userOptions.length) return;
    if (users) {
      const options = users.map((el) => el.id);
      handleUserOptions(options);
    }
  }, [users]);

  useEffect(() => {
    if (isSuccessRemoveToken) {
      alert('Token successfully deleted!');
    }
    if (isErrorRemoveToken) {
      alert('Token deletion error!');
    }
  }, [isSuccessRemoveToken, isErrorRemoveToken]);

  // ---

  const handleUserOptions = (options: string[]) => setUserOptions(options);

  const removeToken = async (symbol: string) => {
    if (confirm(`The Token (${symbol}) will be deleted!`)) {
      deleteToken(symbol);
    }
  };

  return {
    userOptions,
    removeToken,
  };
};

export default useAdmin;
