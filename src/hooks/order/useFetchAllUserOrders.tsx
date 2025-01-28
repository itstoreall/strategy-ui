import { useQuery } from '@tanstack/react-query';
import { orderService } from '@/src/services/order.service';
import { OrderData } from '@/src/types';

const useFetchAllUserOrders = (
  userId: string | null,
  options: { enabled: boolean }
) => {
  const modifyData = (data: OrderData) => data.data;
  const {
    data: userOrders,
    error,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ['userOrders', userId],
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
