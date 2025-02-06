import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updatePrices } from '@/src/lib/api/updatePricesServerAction';
import { UpdatePricesParams } from '@/src/services/token.service';

const useUpdatePrices = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['updatePrices'],
    mutationFn: (params: UpdatePricesParams) => updatePrices(params),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['tokens'] });
      console.log('Prices updated successfully:', data);
    },
    onError: (error) => {
      console.error('Error updating prices:', error);
    },
  });
};

export default useUpdatePrices;
