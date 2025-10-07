import { useQuery } from '@tanstack/react-query';
import { usersKeys } from '../factory/queryFactory';
import { usersApi } from '../services/users/users.services';
import type { UsersResponse } from '../services/users/users.services.types';

export const useUsers = () => {
  return useQuery<UsersResponse>({
    queryKey: usersKeys.lists(),
    queryFn: usersApi.list,
  });
};
