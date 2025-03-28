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
    retry: 3,
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
