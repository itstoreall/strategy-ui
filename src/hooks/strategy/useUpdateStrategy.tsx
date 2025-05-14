import { useMutation } from '@tanstack/react-query';
import useInvalidateQueries from '@/src/hooks/useInvalidateQueries';
import { MutationKeyEnum, QueryKeyEnum } from '@/src/enums';
import { updateStrategyData } from '@/src/lib/api/updateStrategyDataServerAction';
import { TradeStrategy } from '@/src/types';

type UseMutationOptions = {
  strategyId: number;
  params: TradeStrategy[] | null;
};

const c = {
  success: 'Strategy updated successfully:',
  error: 'Failed to update strategy:',
};

const useUpdateStrategy = () => {
  const { updateData } = useInvalidateQueries();

  return useMutation({
    mutationKey: [MutationKeyEnum.UpdateStrategy],
    mutationFn: async ({ strategyId, params }: UseMutationOptions) => {
      const data = JSON.stringify(params);
      return updateStrategyData(strategyId, data);
    },
    onSuccess: (data) => {
      if (data) {
        updateData([QueryKeyEnum.UserOrders, QueryKeyEnum.UserStrategyOrders]);
      }
    },
    onError: (error) => {
      console.error(c.error, error);
    },
  });
};

export default useUpdateStrategy;
