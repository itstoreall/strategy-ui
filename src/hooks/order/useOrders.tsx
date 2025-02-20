import { useQuery } from '@tanstack/react-query';
import { orderService } from '@/src/services/order.service';
import { QueryKeyEnum } from '@/src/enums';
import { OrderData } from '@/src/types';

const useFetchAllOrders = () => {
  const modifyData = (data: OrderData) => data.data;
  const {
    data: orders,
    error,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: [QueryKeyEnum.Orders],
    queryFn: () => orderService.fetchAllOrders(),
    select: modifyData,
  });

  return { orders, error, isLoading, isSuccess };
};

export default useFetchAllOrders;
