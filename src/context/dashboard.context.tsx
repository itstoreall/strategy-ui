/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useMemo } from 'react';
import { useSession } from 'next-auth/react';
import { ChildrenProps, StrategyOrders, Token } from '@/src/types';
import useFetchAllUserOrders from '@/src/hooks/order/useFetchAllUserOrders';
import useFetchAllTokens from '@/src/hooks/token/useFetchAllTokens';

export type ModalContextProps = {
  userId: string | null;
  updatedTokens: Token[] | null;
  userOrders: StrategyOrders | null;
};

const initContext: ModalContextProps = {
  userId: '',
  updatedTokens: null,
  userOrders: null,
};

const DashboardContext = createContext<ModalContextProps>(initContext);

export const DashboardProvider = ({ children }: ChildrenProps) => {
  const { data: session } = useSession();

  const userId = session?.user?.id || null;

  const { userOrders } = useFetchAllUserOrders(userId, { enabled: !!userId });
  const { updatedTokens } = useFetchAllTokens();

  // console.log('tok 1:', updatedTokens);
  // console.log('ord 1:', userOrders);

  const values = useMemo(() => {
    return {
      userId,
      updatedTokens,
      userOrders: userOrders || null,
    };
  }, [userId, updatedTokens, userOrders]);

  return (
    <DashboardContext.Provider value={values}>
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardContext;
