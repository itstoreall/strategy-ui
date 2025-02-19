import { useMutation } from '@tanstack/react-query';
import useModal from '@/src/hooks/useModal';
import useInvalidateQueries from '@/src/hooks/useInvalidateQueries';
import { createOrder } from '@/src/lib/api/createOrderServerAction';
import { CreateOrderDto } from '@/src/services/order.service';

export type QueryKeys = 'userOrders' | 'userStrategyOrders';

const useCreateOrder = (queryKeys: QueryKeys[]) => {
  const { updateData } = useInvalidateQueries();
  // const queryClient = useQueryClient();
  const { closeModal } = useModal();

  return useMutation({
    mutationKey: ['addOrder'],
    mutationFn: (dto: CreateOrderDto) => createOrder(dto),
    onSuccess: (res) => {
      console.log('Order created successfully:', res.data);
      // queryClient.invalidateQueries({
      //   queryKey: [invalidateQuer],
      // });

      updateData(queryKeys);
      // updateData(invalidateQuer ? [invalidateQuer] : ['tokens', 'userOrders']);
      // alert('Success!');
      closeModal();
    },
    onError: (error) => {
      console.error('Error creating order:', error);
    },
  });
};

export default useCreateOrder;
