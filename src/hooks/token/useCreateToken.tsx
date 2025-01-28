import { useMutation, useQueryClient } from '@tanstack/react-query';
import useModal from '@/src/hooks/useModal';
import { CreateTokenDto } from '@/src/services/token.service';
import { createToken } from '@/src/lib/api/createTokenServerAction';

const useCreateToken = () => {
  const queryClient = useQueryClient();
  const { closeModal } = useModal();

  return useMutation({
    mutationKey: ['addToken'],
    mutationFn: (dto: CreateTokenDto) => createToken(dto),
    onSuccess: (res) => {
      console.log('Token created successfully:', res.data);
      queryClient.invalidateQueries({ queryKey: ['token'] });
      closeModal();
    },
    onError: (error) => {
      console.error('Error creating token:', error);
    },
  });
};

export default useCreateToken;
