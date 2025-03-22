/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { User } from '@/src/types';

const useAdmin = (users: User[] | null) => {
  const [userOptions, setUserOptions] = useState<string[]>([]);

  const handleUserOptions = (options: string[]) => setUserOptions(options);

  useEffect(() => {
    if (userOptions.length) return;
    if (users) {
      const options = users.map((el) => el.id);
      handleUserOptions(options);
    }
  }, [users]);

  return {
    userOptions,
  };
};

export default useAdmin;
