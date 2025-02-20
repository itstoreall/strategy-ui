import { useMutation } from '@tanstack/react-query';
import { createToken } from '@/src/lib/api/createTokenServerAction';
import useInvalidateQueries from '@/src/hooks/useInvalidateQueries';
import useModal from '@/src/hooks/useModal';
import { MutationKeyEnum, QueryKeyEnum } from '@/src/enums';
import { CreateTokenDto } from '@/src/services/token.service';

const useCreateToken = () => {
  const { updateData } = useInvalidateQueries();
  // const queryClient = useQueryClient();
  const { closeModal } = useModal();

  return useMutation({
    mutationKey: [MutationKeyEnum.AddToken],
    mutationFn: (dto: CreateTokenDto) => createToken(dto),
    onSuccess: (res) => {
      console.log('Token created successfully:', res.data);
      // queryClient.invalidateQueries({ queryKey: ['token'] });
      updateData([QueryKeyEnum.Tokens]);
      closeModal();
    },
    onError: (error) => {
      console.error('Error creating token:', error);
    },
  });
};

export default useCreateToken;
