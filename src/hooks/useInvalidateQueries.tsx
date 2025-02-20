import { useQueryClient } from '@tanstack/react-query';
import { QueryKeyEnum } from '@/src/enums';

const useInvalidateQueries = () => {
  const queryClient = useQueryClient();

  const updateData = (queryKeys: QueryKeyEnum[]) => {
    queryKeys.forEach((key) =>
      queryClient.invalidateQueries({ queryKey: [key] })
    );
    /*
    console.log(queryKeys, 'updated successfully');
    // */
  };

  return { updateData };
};

export default useInvalidateQueries;
