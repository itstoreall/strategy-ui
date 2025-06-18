import { useMutation } from '@tanstack/react-query';
import { updatePrices } from '@/src/lib/api/updatePricesServerAction';
import useInvalidateQueries from '@/src/hooks/useInvalidateQueries';
import { UpdatePricesParams } from '@/src/services/token.service';
import { MutationKeyEnum, QueryKeyEnum } from '@/src/enums';

const c = {
  success: 'Prices updated successfully:',
  error: 'Error updating prices:',
};

const useUpdatePrices = () => {
  const { updateData } = useInvalidateQueries();
  return useMutation({
    mutationKey: [MutationKeyEnum.UpdatePrices],
    mutationFn: (params: UpdatePricesParams) => updatePrices(params),
    retry: 1,
    onSuccess: (data) => {
      if (data) {
        updateData([QueryKeyEnum.Tokens]);
      }
    },
    onError: (error) => {
      console.error(c.error, error);
    },
  });
};

export default useUpdatePrices;
