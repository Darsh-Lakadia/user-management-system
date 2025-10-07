export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  role: string;
  avatar: string;
}

export type UsersResponse = User[];

export interface UserRequest {
  name: string;
  email: string;
  role: string;
  password?: string;
  avatar: string;
}
