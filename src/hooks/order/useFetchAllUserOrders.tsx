import { useQuery } from '@tanstack/react-query';
import { orderService } from '@/src/services/order.service';
import { OrderTypeEnum, QueryKeyEnum } from '@/src/enums';
import { OrderData, StrategyOrders } from '@/src/types';
import { customTokens, DCAPTokens } from '@/src/config';
/*
import { useSession } from 'next-auth/react';
import { Session } from 'next-auth';
*/

type UserId = string | null;
type Options = { enabled: boolean };

const c = {
  errMsg: 'Invalid userId in queryKey!',
};

const useFetchAllUserOrders = (userId: UserId, options: Options) => {
  /*
  const session = useSession();
  if (!session.data) return [];
  */

  const modifyData = (data: OrderData) => {
    const categorized = data.data.reduce<StrategyOrders>(
      (acc, item) => {
        /*
        if (item.symbol === 'BTC') {
          console.log('item:', item.symbol);
        }
        */

        if (item.type === OrderTypeEnum.Buy) {
          if (customTokens.includes(item.symbol)) {
            acc.custom.push(item);
          } else if (DCAPTokens.includes(item.symbol)) {
            acc.DCAP.push(item);
          } else {
            acc.buy.push(item);
          }
        } else if (item.type === OrderTypeEnum.Sell) acc.sell.push(item);
        return acc;
      },
      { DCAP: [], custom: [], buy: [], sell: [] }
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
        throw new Error(c.errMsg);
      }
      return orderService.fetchAllByUserId(userId);
    },
    select: modifyData,
    enabled: options.enabled,
  });

  return { userOrders, error, isLoading, isSuccess };
};

export default useFetchAllUserOrders;
