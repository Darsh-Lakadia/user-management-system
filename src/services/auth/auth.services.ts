import apiClient from "../../lib/axios";
import type { AuthResponse, LoginCredentials } from "./auth.services.types";


export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await apiClient.post("/auth/login", credentials);
    return response.data;
  },

  refreshToken: async (): Promise<{ token: string }> => {
    const response = await apiClient.post("/auth/refresh");
    return response.data;
  },
};
