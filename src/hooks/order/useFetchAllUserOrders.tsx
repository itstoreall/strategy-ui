import { useQuery } from '@tanstack/react-query';
import { orderService } from '@/src/services/order.service';
import { OrderTypeEnum, QueryKeyEnum } from '@/src/enums';
import { OrderData, StrategyOrders } from '@/src/types';
// import { useSession } from 'next-auth/react';
// import { Session } from 'next-auth';

// export type Orders = {
//   buy: Order[];
//   sell: Order[];
// };

const useFetchAllUserOrders = (
  userId: string | null,
  options: { enabled: boolean }
) => {
  // const session = useSession();

  // if (!session.data) return [];

  // console.log(
  //   'session:',
  //   (session.data as Session & { currentToken: string }).currentToken
  // );

  const modifyData = (data: OrderData) => {
    const categorized = data.data.reduce<StrategyOrders>(
      (acc, item) => {
        if (item.type === OrderTypeEnum.Buy) acc.buy.push(item);
        else if (item.type === OrderTypeEnum.Sell) acc.sell.push(item);
        return acc;
      },
      { buy: [], sell: [] }
    );

    return categorized;
  };

  const {
    data: userOrders,
    error,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: [QueryKeyEnum.UserOrders, userId],
    queryFn: ({ queryKey }) => {
      const [, userId] = queryKey;
      if (!userId || typeof userId !== 'string') {
        throw new Error('Invalid userId in queryKey!');
      }
      return orderService.fetchAllByUserId(userId);
    },
    select: modifyData,
    enabled: options.enabled,
  });

  return { userOrders, error, isLoading, isSuccess };
};

export default useFetchAllUserOrders;
