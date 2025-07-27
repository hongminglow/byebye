import { apiClient, TApiResponse } from "@/api/axios";
import { TUserResponse } from "@/types/auth";
import { TUserListResponse } from "@/types/user";

export const getCurrentUser = async (): Promise<TUserResponse> => {
  const response = await apiClient.get<TApiResponse<TUserResponse>>("/auth/me");
  return response.data;
};

export const getUserList = async (): Promise<TUserListResponse> => {
  const response = await apiClient.get<TApiResponse<TUserListResponse>>(
    "/users",
    {
      baseURL: import.meta.env.VITE_GO_SERVER_BASE_URL,
    }
  );
  return response.data;
};
