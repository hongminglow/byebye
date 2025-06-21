// api/auth.ts
import { TUser, TUserResponse } from "@/types/auth";
import { apiClient } from "@/api/axios";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: Omit<TUser, "password">;
  token: string;
  refreshToken?: string;
}

export interface GoogleLoginRequest {
  token: string;
}

export const authApi = {
  // POST /api/auth/login
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>(
      "/auth/login",
      credentials
    );
    return response.data;
  },

  // POST /api/auth/google
  googleLogin: async (request: GoogleLoginRequest): Promise<LoginResponse> => {
    const response = await apiClient.post("/auth/google", request);
    return response.data;
  },

  // GET /api/auth/me
  getCurrentUser: async (): Promise<TUserResponse> => {
    const response = await apiClient.get<TUserResponse>("/auth/me");
    return response.data;
  },

  // POST /api/auth/refresh
  refreshToken: async (): Promise<{ token: string }> => {
    const response = await apiClient.post("/auth/refresh");
    return response.data;
  },

  // POST /api/auth/logout
  logout: async (): Promise<void> => {
    await apiClient.post("/auth/logout");
  },
};
