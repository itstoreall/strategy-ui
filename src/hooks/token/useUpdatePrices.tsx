import { useMutation } from '@tanstack/react-query';
import { updatePrices } from '@/src/lib/api/updatePricesServerAction';
import useInvalidateQueries from '@/src/hooks/useInvalidateQueries';
import { UpdatePricesParams } from '@/src/services/token.service';
import { MutationKeyEnum, QueryKeyEnum } from '@/src/enums';

const config = {
  success: 'Prices updated successfully:',
  error: 'Error updating prices:',
};

const useUpdatePrices = () => {
  const { updateData } = useInvalidateQueries();

  return useMutation({
    mutationKey: [MutationKeyEnum.UpdatePrices],
    mutationFn: (params: UpdatePricesParams) => updatePrices(params),
    retry: (failureCount, error) => {
      if (failureCount < 3) {
        // return error?.response?.status === 500;
        // return error?.response?.status === 500;
        console.error('Attempt:', failureCount);
        console.error('Error:', error);
        return true;
      }
      console.error('Attempts are over.');
      return false;
    },
    onSuccess: (data) => {
      updateData([QueryKeyEnum.Tokens]);
      console.log(config.success, data.tokens.length, 'tokens');
    },
    onError: (error) => {
      console.error(config.error, error);
    },
  });
};

export default useUpdatePrices;
