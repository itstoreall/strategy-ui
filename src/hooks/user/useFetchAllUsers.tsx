import { useQuery } from '@tanstack/react-query';
import { userService } from '@/src/services/user.service';
import { QueryKeyEnum } from '@/src/enums';

const useFetchAllUsers = (options: { enabled: boolean }) => {
  /*
  const modifyData = (data) => {
    return data;
  };
  */

  const { data, error, isLoading, isSuccess } = useQuery({
    queryKey: [QueryKeyEnum.Users],
    queryFn: userService.getAllUsers,
    /*
    select: modifyData,
    */
    enabled: options.enabled,
  });

  return { users: data, error, isLoading, isSuccess };
};

export default useFetchAllUsers;
