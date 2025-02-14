import { useMutation, useQueryClient } from '@tanstack/react-query';
import useModal from '@/src/hooks/useModal';
import { CreateOrderDto } from '@/src/services/order.service';
import { createOrder } from '@/src/lib/api/createOrderServerAction';

const useCreateOrder = () => {
  const queryClient = useQueryClient();
  const { closeModal } = useModal();

  return useMutation({
    mutationKey: ['addOrder'],
    mutationFn: (dto: CreateOrderDto) => createOrder(dto),
    onSuccess: (res) => {
      console.log('Order created successfully:', res.data);
      queryClient.invalidateQueries({ queryKey: ['userOrders'] });
      // alert('Success!');
      closeModal();
    },
    onError: (error) => {
      console.error('Error creating order:', error);
    },
  });
};

export default useCreateOrder;
