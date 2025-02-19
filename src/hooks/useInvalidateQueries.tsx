import { useQueryClient } from '@tanstack/react-query';

const useInvalidateQueries = () => {
  const queryClient = useQueryClient();

  const updateData = (queryKeys: string[]) => {
    queryKeys.forEach((key) =>
      queryClient.invalidateQueries({ queryKey: [key] })
    );
    console.log(queryKeys, 'updated successfully');
  };

  return { updateData };
};

export default useInvalidateQueries;
