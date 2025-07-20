import { useMutation } from '@tanstack/react-query';
import useInvalidateQueries from '@/src/hooks/useInvalidateQueries';
import { updateStrategyData } from '@/src/lib/api/updateStrategyDataServerAction';
import { MutationKeyEnum, QueryKeyEnum } from '@/src/enums';
import { UpdatedSrategyData } from '@/src/types';

type UseMutationOptions = {
  strategyId: number;
  newStrategyData: UpdatedSrategyData | null;
};

const c = {
  success: 'Strategy updated successfully:',
  error: 'Failed to update strategy:',
};

const useUpdateStrategy = () => {
  const { updateData } = useInvalidateQueries();

  return useMutation({
    mutationKey: [MutationKeyEnum.UpdateStrategy],
    mutationFn: async ({ strategyId, newStrategyData }: UseMutationOptions) => {
      const data = JSON.stringify(newStrategyData);
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
