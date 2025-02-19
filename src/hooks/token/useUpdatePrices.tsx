import { useMutation } from '@tanstack/react-query';
import { updatePrices } from '@/src/lib/api/updatePricesServerAction';
import { UpdatePricesParams } from '@/src/services/token.service';
import useInvalidateQueries from '../useInvalidateQueries';

const useUpdatePrices = () => {
  const { updateData } = useInvalidateQueries();

  return useMutation({
    mutationKey: ['updatePrices'],
    mutationFn: (params: UpdatePricesParams) => updatePrices(params),
    onSuccess: (data) => {
      updateData(['tokens']);
      console.log('Prices updated successfully:', data);
    },
    onError: (error) => {
      console.error('Error updating prices:', error);
    },
  });
};

export default useUpdatePrices;
