import { useQuery } from '@tanstack/react-query';
import { orderService } from '@/src/services/order.service';
import { OrderData } from '@/src/types';
// import { OrderTypeEnum } from '@/src/enums';

// export type Orders = {
//   buy: Order[];
//   sell: Order[];
// };

const useFetchAllUserStrategyOrders = (
  userId: string | null,
  type: string | null,
  symbol: string | null,
  status: string | null,
  exchange: string | null,
  options: { enabled: boolean }
) => {
  const modifyData = (data: OrderData) => {
    // const categorized = data.data.reduce<Orders>(
    //   (acc, item) => {
    //     if (item.type === OrderTypeEnum.Buy) acc.buy.push(item);
    //     else if (item.type === OrderTypeEnum.Sell) acc.sell.push(item);
    //     return acc;
    //   },
    //   { buy: [], sell: [] }
    // );

    return data.data;
  };

  const {
    data: userOrders,
    error,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ['userStrategyOrders', userId, type, symbol, status, exchange],
    queryFn: ({ queryKey }) => {
      const [, userId, type, symbol, status, exchange] = queryKey;
      const isUserId = userId || typeof userId === 'string';
      const isType = type || typeof type === 'string';
      const isSymbol = symbol || typeof symbol === 'string';
      const isStatus = status || typeof status === 'string';
      const isExchange = exchange || typeof exchange === 'string';

      if (!isUserId || !isType || !isSymbol || !isStatus || !isExchange) {
        throw new Error('Invalid Strategy params in queryKey!');
      }

      return orderService.fetchAllByUserIdAndStrategy(
        userId,
        type,
        symbol,
        status,
        exchange
      );
    },
    select: modifyData,
    enabled: options.enabled,
  });

  return { userOrders, error, isLoading, isSuccess };
};

export default useFetchAllUserStrategyOrders;
