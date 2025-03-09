import { useQuery } from '@tanstack/react-query';
import { orderService } from '@/src/services/order.service';
import { QueryKeyEnum } from '@/src/enums';
import { OrderData } from '@/src/types';

const useFetchAllUserStrategyOrders = (
  userId: string | null,
  type: string | null,
  symbol: string | null,
  status: string | null,
  exchange: string | null,
  options: { enabled: boolean }
) => {
  const modifyData = (data: OrderData) => {
    return data.data;
  };

  const {
    data: userOrders,
    error,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: [
      QueryKeyEnum.UserStrategyOrders,
      userId,
      type,
      symbol,
      status,
      exchange,
    ],
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
