import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updatePrices } from '@/src/lib/api/updatePricesServerAction';
import { UpdatePricesParams } from '@/src/services/token.service';

const useUpdatePrices = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['updatePrices'],
    mutationFn: (params: UpdatePricesParams) => updatePrices(params),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['tokens'] });
      console.log('Prices updated successfully:', data);
    },
    onError: (error) => {
      console.error('Error updating prices:', error);
    },
  });
};

export default useUpdatePrices;

/*
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updatePrices } from '@/src/lib/api/updatePricesServerAction';
import { UpdatePricesParams } from '@/src/services/token.service';
import { Token, TokensRes } from '@/src/types';

const useUpdatePrices = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['updatePrices'],
    mutationFn: (params: UpdatePricesParams) => updatePrices(params),

    // Optimistic Update
    onMutate: async () => {
      // Cancel any ongoing queries for tokens
      await queryClient.cancelQueries({ queryKey: ['tokens'] });

      // Get current tokens data
      const previousTokens = queryClient.getQueryData(['tokens']);

      // Optionally set a loading state or placeholder data
      queryClient.setQueryData(['tokens'], (old: TokensRes) => {
        if (!old) return null;
        return {
          ...old,
          data: old.data.tokens.map((token: Token) => ({
            ...token,
            price: token.price + 1, // Mock optimistic price change
          })),
        };
      });

      // Return context for rollback
      return { previousTokens };
    },

    // On Success
    onSuccess: (data) => {
      queryClient.setQueryData(['tokens'], (old: TokensRes) => ({
        ...old,
        data, // Replace with the updated data
      }));
      console.log('Prices updated successfully:', data);
    },

    // On Error (Rollback)
    onError: (error, _, context) => {
      if (context?.previousTokens) {
        queryClient.setQueryData(['tokens'], context.previousTokens);
      }
      console.error('Error updating prices:', error);
    },

    // Always refetch after mutation to ensure data consistency
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tokens'] });
    },
  });
};

export default useUpdatePrices;
*/
