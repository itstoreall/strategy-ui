import { Session } from '@/src/types';

const useUserList = () => {
  const getRecentSession = (
    sessions: Session[],
    userId: string
  ): Date | null => {
    const userSessions = sessions.filter(
      (session) => session.userId === userId
    );
    if (userSessions.length === 0) return null;
    return userSessions.reduce((latest, session) =>
      session.updatedAt > latest.updatedAt ? session : latest
    ).updatedAt;
  };

  return { getRecentSession };
};

export default useUserList;
