import { useMutation } from '@tanstack/react-query';
import { deleteToken } from '@/src/lib/auth/deleteTokenServerAction';
import { MutationKeyEnum } from '@/src/enums';

const useRemoveToken = (refetchTokens: () => void) => {
  return useMutation({
    mutationKey: [MutationKeyEnum.DeleteToken],
    mutationFn: (symbol: string) => deleteToken(symbol),
    onSuccess: (res) => {
      console.log('Token deleted successfully:', res);
      refetchTokens();
    },
    onError: () => {
      console.error('Token deletion error!');
    },
  });
};

export default useRemoveToken;
