/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import useFetchAllUsers from '@/src/hooks/user/useFetchAllUsers';
import useGlobalState from '@/src/hooks/useGlobalState';

const useAdmin = () => {
  const [userOptions, setUserOptions] = useState<string[]>([]);

  const { users } = useFetchAllUsers({ enabled: !userOptions.length });
  const { updatedTokens, fetchTokens } = useGlobalState();

  const handleUserOptions = (options: string[]) => setUserOptions(options);

  useEffect(() => {
    if (userOptions.length) return;
    if (users?.length) {
      const options = users.map((el) => el.id);
      handleUserOptions(options);
    }
  }, [users]);

  return {
    updatedTokens,
    users,
    userOptions,
    fetchTokens,
    handleUserOptions,
  };
};

export default useAdmin;
