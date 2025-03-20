/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { SessionContextValue } from 'next-auth/react';
import useGlobalState from '@/src/hooks/useGlobalState';
import useModal from '@/src/hooks/useModal';
import useFetchAllUsers from '@/src/hooks/user/useFetchAllUsers';

const useAdmin = (session: SessionContextValue) => {
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
    session,
    updatedTokens,
    fetchTokens,
    RenderModal,
    users,
    userOptions,
    handleUserOptions,
  };
};

export default useAdmin;
