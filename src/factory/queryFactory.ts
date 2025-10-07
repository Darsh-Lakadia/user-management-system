export const authKeys = {
  all: () => ['auth'] as const,
  profile: () => [...authKeys.all(), 'profile'] as const,
} as const;

export const usersKeys = {
  all: () => ['users'] as const,
  lists: () => [...usersKeys.all(), 'list'] as const,
  list: (params?: any) => [...usersKeys.lists(), params] as const,
  byId: (id: string) => [...usersKeys.all(), 'byId', id] as const,
} as const;

export const queryKeys = {
  auth: authKeys,
  users: usersKeys,
} as const;
