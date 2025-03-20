/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import useFetchAllUsers from '@/src/hooks/user/useFetchAllUsers';
import useGlobalState from '@/src/hooks/useGlobalState';
import useModal from '@/src/hooks/useModal';

const useAdmin = () => {
  const [userOptions, setUserOptions] = useState<string[]>([]);

  const { users } = useFetchAllUsers({ enabled: !userOptions.length });
  const { updatedTokens, fetchTokens } = useGlobalState();
  const { RenderModal } = useModal();

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
    fetchTokens,
    RenderModal,
    users,
    userOptions,
    handleUserOptions,
  };
};

export default useAdmin;
