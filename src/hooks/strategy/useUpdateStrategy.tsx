import { useMutation } from '@tanstack/react-query';
import useInvalidateQueries from '@/src/hooks/useInvalidateQueries';
import * as service from '@/src/services/strategy.service';
import { MutationKeyEnum, QueryKeyEnum } from '@/src/enums';

type UseMutationOptions = {
  strategyId: number;
  params: service.UpdateStrategyParams;
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
      return service.strategyService.updateStratedy(strategyId, params);
    },
    onSuccess: (data) => {
      console.log('success 1:', data);
      if (data) {
        console.log('success 2:', data);
        updateData([QueryKeyEnum.UserOrders, QueryKeyEnum.UserStrategyOrders]);
      }
    },
    onError: (error) => {
      console.error(c.error, error);
    },
  });
};

export default useUpdateStrategy;
