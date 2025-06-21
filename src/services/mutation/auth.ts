import { apiClient, TApiResponse } from "@/api/axios";
import {
  GoogleLoginRequest,
  LoginCredentials,
  LoginResponse,
} from "@/types/auth";

export const loginMutation = async (
  credentials: LoginCredentials
): Promise<LoginResponse> => {
  const response = await apiClient.post<
    TApiResponse<LoginResponse>,
    LoginCredentials
  >("/auth/login", credentials);
  return response.data;
};

export const googleLoginMutation = async (
  request: GoogleLoginRequest
): Promise<LoginResponse> => {
  const response = await apiClient.post<
    TApiResponse<LoginResponse>,
    GoogleLoginRequest
  >("/auth/google", request);
  return response.data;
};

export const logoutMutation = async (): Promise<void> => {
  return apiClient.post("/auth/logout");
};
