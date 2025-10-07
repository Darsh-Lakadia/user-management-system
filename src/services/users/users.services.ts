import apiClient from "../../lib/axios";
import type { UsersResponse } from "./users.services.types";

export const usersApi = {
  list: async (): Promise<UsersResponse> => {
    const response = await apiClient.get("/users");
    return response.data;
  },
};
