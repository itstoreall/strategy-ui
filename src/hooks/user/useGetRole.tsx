// useGetRole.ts

// import { useQuery } from '@tanstack/react-query';
// import { userService } from '@/src/services/user.service';

// export const useGetRole = (id: string) => {
//   return useQuery({
//     queryKey: ['role', id],
//     queryFn: () => userService.getRole(id),
//     enabled: !!id, // Only run query if id is truthy
//     retry: 2, // Retry up to 2 times on failure
//     staleTime: 1000 * 60 * 5, // Cache role data for 5 minutes
//   });
// };
