/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useMemo } from 'react';
import { useSession } from 'next-auth/react';
// import { getUserRole } from '@/src/lib/auth/getUserRoleServerAction';
// import useFetchAllUserOrders from '@/src/hooks/order/useFetchAllUserOrders';
// import useFetchAllTokens from '@/src/hooks/token/useFetchAllTokens';
// import useFetchAllUsers from '@/src/hooks/user/useFetchAllUsers';
// import { AuthRoleEnum } from '@/src/enums';
import * as t from '@/src/types';

export type DashboardContextProps = {
  // users: t.User[] | null;
  userId: string | null;
  // currentUser: string;
  // isAdmin: boolean;
  // updatedTokens: t.Token[] | null;
  // userOrders: t.StrategyOrders | null;
  // usingTokens: number;
  // usingDeposit: number;
  // toggleUser: (currentUser: string) => void;
};

const initContext: DashboardContextProps = {
  // users: [],
  userId: '',
  // currentUser: '',
  // isAdmin: false,
  // updatedTokens: null,
  // userOrders: null,
  // usingTokens: 0,
  // usingDeposit: 0,
  // toggleUser: () => {},
};

const DashboardContext = createContext<DashboardContextProps>(initContext);

export const DashboardProvider = ({ children }: t.ChildrenProps & {}) => {
  // const [usingTokens, setUsingTokens] = useState(0);
  // const [usingDeposit, setUsingDeposit] = useState(0);
  // const [currentUser, setCurrentUser] = useState('');
  // const [isAdmin, setIsAdmin] = useState(false);

  const { data: session } = useSession();
  const userId = session?.user?.id || null;

  // useEffect(() => {
  //   if (userId) setCurrentUser(userId);
  // }, [userId]);

  // useEffect(() => {
  //   getUserRole(currentUser).then((res) => {
  //     setIsAdmin(res?.role === AuthRoleEnum.Admin);
  //   });
  // }, [currentUser]);

  // const ordersParam = { enabled: !!userId };
  // const usersParam = { enabled: isAdmin };

  // const { userOrders } = useFetchAllUserOrders(currentUser, ordersParam);
  // const { updatedTokens } = useFetchAllTokens();
  // const { users } = useFetchAllUsers(usersParam);

  // useEffect(() => {
  //   if (userOrders) {
  //     let totalDeposit = 0;
  //     const assets = userOrders.buy.map((order) => {
  //       totalDeposit = totalDeposit + order.fiat;
  //       return order.symbol;
  //     });
  //     const uniqueSymbols = new Set([...assets]);
  //     setUsingDeposit(totalDeposit);
  //     setUsingTokens(uniqueSymbols.size);
  //   } else {
  //     setUsingDeposit(0);
  //     setUsingTokens(0);
  //   }
  // }, [userOrders, currentUser]);

  // const toggleUser = (currentUser: string) => {
  //   if (!users) return;
  //   for (let i = 0; i < users.length; i++) {
  //     const element = users[i];
  //     if (element.id === currentUser) {
  //       if (users.length - 1 === i) {
  //         const id = users[0].id;
  //         setCurrentUser(id);
  //       } else {
  //         const idx = users.findIndex((item) => item.id === element.id);
  //         const id = users[idx + 1].id;
  //         setCurrentUser(id);
  //       }
  //     }
  //   }
  // };

  const values = useMemo(() => {
    return {
      // isAdmin,
      // users: users ?? null,
      userId,
      // currentUser,
      // updatedTokens,
      // userOrders: userOrders || null,
      // usingTokens,
      // usingDeposit,
      // toggleUser,
    };
  }, [
    userId,
    // updatedTokens,
    // userOrders,
    // currentUser,
    // isAdmin,
    // usingTokens,
    // usingDeposit,
  ]);

  return (
    <DashboardContext.Provider value={values}>
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardContext;
