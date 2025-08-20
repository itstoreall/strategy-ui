import { useQuery } from '@tanstack/react-query';
import { hodlTargetsService } from '@/src/services/hodlTargets.service';
import { QueryKeyEnum } from '@/src/enums';
import { HodlTargetsData } from '@/src/types';

type UserId = string | null;
type Options = { enabled: boolean };

const useFetchAllUserHodlTargets = (userId: UserId, options: Options) => {
  const modifyData = (data: { data: HodlTargetsData[] }) => {
    return data.data;
  };

  const { data, error, isLoading, isSuccess } = useQuery({
    queryKey: [QueryKeyEnum.HodlTargets, userId],
    queryFn: ({ queryKey }) => {
      const [, userId] = queryKey;
      const isUserId = userId || typeof userId === 'string';

      if (!isUserId) {
        throw new Error('Invalid Hodl Targets params in queryKey!');
      }

      return hodlTargetsService.fetchAllHodlTargetsByUserId(userId);
    },
    select: modifyData,
    enabled: options.enabled,
  });

  return {
    hodlTargetsData: data,
    error,
    isLoading,
    isSuccess,
  };
};

export default useFetchAllUserHodlTargets;
