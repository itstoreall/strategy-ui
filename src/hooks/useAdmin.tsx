/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
// import useFetchAllUsers from '@/src/hooks/user/useFetchAllUsers';
// import useGlobalState from '@/src/hooks/useGlobalState';
import { User } from '../types';

const useAdmin = (users: User[]) => {
  const [userOptions, setUserOptions] = useState<string[]>([]);

  const handleUserOptions = (options: string[]) => setUserOptions(options);

  useEffect(() => {
    if (userOptions.length) return;
    if (users?.length) {
      const options = users.map((el) => el.id);
      handleUserOptions(options);
    }
  }, [users]);

  return { userOptions };
};

export default useAdmin;
