import apiClient from "../../lib/axios";
import type { LoginCredentials, AuthResponse, User, RegisterData } from "./auth.services.types";


export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await apiClient.post("/auth/login", credentials);
    return response.data;
  },
};
