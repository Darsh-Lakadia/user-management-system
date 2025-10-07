import apiClient from "../../lib/axios";
import type { UsersResponse, UserRequest, User } from "./users.services.types";

export const usersApi = {
  list: async (): Promise<UsersResponse> => {
    const response = await apiClient.get("/users");
    return response.data;
  },
  create: async (payload: UserRequest): Promise<User> => {
    const response = await apiClient.post(`/users`, payload);
    return response.data;
  },
  update: async (id: number, payload: UserRequest): Promise<User> => {
    const response = await apiClient.put(`/users/${id}`, payload);
    return response.data;
  },
  getById: async (id: number): Promise<User> => {
    const response = await apiClient.get(`/users/${id}`);
    return response.data;
  },
  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/users/${id}`);
  },
};
