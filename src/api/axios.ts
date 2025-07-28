// api/client.ts
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { cookieStorage } from "@/utils/cookies";

const API_BASE_URL =
  //   import.meta.env.VITE_API_BASE_URL || "http://localhost:3002/api";
  import.meta.env.VITE_GO_SERVER_BASE_URL || "http://localhost:3001/api";

export interface TApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
  timestamp?: string;
}

export interface TApiError {
  message: string;
  response?: {
    data?: {
      message?: string;
    };
  };
}

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - Add auth token to all requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = cookieStorage.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Log requests in development
    if (import.meta.env.DEV) {
      console.log(
        `🚀 ${config.method?.toUpperCase()} ${config.url}`,
        config.data
      );
    }

    return config;
  },
  (error) => {
    console.error("❌ Request Error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor - Handle global errors
axiosInstance.interceptors.response.use(
  <T>(
    response: AxiosResponse<TApiResponse<T>>
  ): AxiosResponse<TApiResponse<T>> => {
    if (import.meta.env.DEV) {
      console.log(
        `✅ ${response.status} ${response.config.url}`,
        response.data
      );
    }
    return response;
  },
  (error) => {
    console.error("❌ Response Error:", error.response?.data || error.message);

    // Handle auth errors globally
    // if (error.response?.status === 401) {
    //   cookieStorage.remove("token");
    //   window.location.href = "/login";
    // }

    return Promise.reject(error);
  }
);

export const apiClient = {
  get: <T>(url: string, config?: AxiosRequestConfig): Promise<T> =>
    axiosInstance.get<T>(url, config).then((response) => response.data),
  post: <T, D>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<T> =>
    axiosInstance.post<T>(url, data, config).then((response) => response.data),
  put: <T, D>(url: string, data?: D, config?: AxiosRequestConfig): Promise<T> =>
    axiosInstance.put<T>(url, data, config).then((response) => response.data),
  delete: <T>(url: string, config?: AxiosRequestConfig): Promise<T> =>
    axiosInstance.delete<T>(url, config).then((response) => response.data),
};
