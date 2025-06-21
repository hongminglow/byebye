import { apiClient, TApiResponse } from "@/api/axios";
import { TUserResponse } from "@/types/auth";

export const getCurrentUser = async (): Promise<TUserResponse> => {
  const response = await apiClient.get<TApiResponse<TUserResponse>>("/auth/me");
  return response.data;
};
