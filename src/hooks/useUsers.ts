import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { usersKeys } from '../factory/queryFactory';
import { usersApi } from '../services/users/users.services';
import type { UserRequest, User, UsersResponse } from '../services/users/users.services.types';
import toast from 'react-hot-toast';

export const useUsers = () => {
  return useQuery<UsersResponse>({
    queryKey: usersKeys.lists(),
    queryFn: usersApi.list,
  });
};
export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation<User, Error, UserRequest>({
    mutationFn: (payload) => usersApi.create(payload),
    onSuccess: (createdUser) => {
      queryClient.setQueryData<UsersResponse>(usersKeys.lists(), (old) => {
        if (!old) return [createdUser];
        return [...old, createdUser];
      });
      queryClient.invalidateQueries({ queryKey: usersKeys.lists() });
      toast.success('User created successfully');
    },
  });
};

export const useUpdateUser = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation<User, Error, UserRequest>({
    mutationFn: (payload) => usersApi.update(id, payload),
    onSuccess: (updatedUser) => {
      queryClient.setQueryData<UsersResponse>(usersKeys.lists(), (old) => {
        if (!old) return old;
        return old.map((u) => (u.id === updatedUser.id ? updatedUser : u));
      });
      queryClient.invalidateQueries({ queryKey: usersKeys.lists() });
      toast.success('User updated successfully');
    }
  });
};

export const useGetUserById = (id?: number) => {
  return useQuery<User>({
    queryKey: usersKeys.byId(id?.toString() ?? ''),
    queryFn: () => usersApi.getById(id ?? 0),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: (id) => usersApi.delete(id),
    onSuccess: (_, id) => {
      queryClient.setQueryData<UsersResponse>(usersKeys.lists(), (old) => {
        if (!old) return old;
        return old.filter((u) => u.id !== id);
      });
      queryClient.invalidateQueries({ queryKey: usersKeys.lists() });
      toast.success('User deleted successfully');
    }
  });
};
