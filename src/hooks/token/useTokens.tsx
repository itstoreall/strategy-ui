import { useQuery } from '@tanstack/react-query';
import {
  tokenService,
  FindAllTokensParams,
} from '@/src/services/token.service';
import { TokensRes } from '@/src/types';

/*
const initialData: { data: Post[] } = {
  data: [
    {
      body: 'init body',
      id: 0,
      title: 'init Title',
      userId: 1,
    },
  ],
};
*/

const useTokens = (params: FindAllTokensParams) => {
  const modifyData = (data: TokensRes) => {
    console.log('modifyData:', data);
    return data.data;
    // return data.data.filter((_: unknown, idx: number) => idx < 10) ?? [];
  };

  const {
    data,
    error,
    isLoading,
    isSuccess,
    /*
    isStale, refetch
    */
  } = useQuery({
    queryKey: ['tokens', params],
    queryFn: () => tokenService.fetchAllTokens(),
    select: modifyData,
    // enabled: params.isEnable,
    // initialData,
    /*
    staleTime: 5000
    */
  });

  /*
  useEffect(() => {
    console.log('isStale:', isStale);
    if (isStale) refetch();
  }, [isStale]);
  */

  return { data, error, isLoading, isSuccess };
};

export default useTokens;
