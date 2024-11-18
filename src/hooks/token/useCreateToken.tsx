import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateTokenDto } from '@/src/services/token.service';
import { createToken } from '@/src/lib/api/createTokenServerAction';

const useCreateToken = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['addToken'],
    mutationFn: (dto: CreateTokenDto) => createToken(dto),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['token'] });
      console.log('Token created successfully:', data);
    },
    onError: (error) => {
      console.error('Error creating token:', error);
    },
  });
};

export default useCreateToken;
