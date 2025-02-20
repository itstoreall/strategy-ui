import { useMutation } from '@tanstack/react-query';
import { createOrder } from '@/src/lib/api/createOrderServerAction';
import useInvalidateQueries from '@/src/hooks/useInvalidateQueries';
import useModal from '@/src/hooks/useModal';
import { MutationKeyEnum, QueryKeyEnum } from '@/src/enums';
import { CreateOrderDto } from '@/src/services/order.service';

const useCreateOrder = (queryKeys: QueryKeyEnum[]) => {
  const { updateData } = useInvalidateQueries();
  const { closeModal } = useModal();

  return useMutation({
    mutationKey: [MutationKeyEnum.AddOrder],
    mutationFn: (dto: CreateOrderDto) => createOrder(dto),
    onSuccess: (res) => {
      console.log('Order created successfully:', res.data);
      updateData(queryKeys);
      // alert('Success!');
      closeModal();
    },
    onError: (error) => {
      console.error('Error creating order:', error);
    },
  });
};

export default useCreateOrder;
