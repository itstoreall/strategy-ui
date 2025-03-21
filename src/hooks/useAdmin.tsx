/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
// import { getAllSessions } from '@/src/lib/auth/getAllSessionsServerAction';
import {
  // Session,
  User,
} from '@/src/types';

const useAdmin = (users: User[] | null) => {
  const [userOptions, setUserOptions] = useState<string[]>([]);
  // const [sessions, setSessions] = useState<Session[]>([]);

  const handleUserOptions = (options: string[]) => setUserOptions(options);

  // useEffect(() => {
  //   getAllSessions().then((res) => {
  //     if (res) {
  //       setSessions(res);
  //     }
  //   });
  // }, []);

  useEffect(() => {
    if (userOptions.length) return;
    if (users) {
      const options = users.map((el) => el.id);
      handleUserOptions(options);
    }
  }, [users]);

  return { userOptions };
};

export default useAdmin;
