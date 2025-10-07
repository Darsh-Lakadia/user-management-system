export const authAPIKeys = {
  login: '/auth/login',
  register: '/auth/register',
  logout: '/auth/logout',
  profile: '/auth/profile',
  refresh: '/auth/refresh',
} as const;

export const usersAPIKeys = {
  users: '/users',
} as const;

export const apiEndpoints = {
  auth: authAPIKeys,
  users: usersAPIKeys,
} as const;
