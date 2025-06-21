// hooks/useAuth.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { authApi } from "@/api/auth/auth";
import { cookieStorage } from "@/utils/cookies";
import { toast } from "sonner";
import { publicRoutes } from "@/types/routes";
import { TUserResponse } from "@/types/auth";
import { TApiError } from "@/api/axios";
import { useAuthStore } from "../store/useAuthStore";

// Query Keys
export const authKeys = {
  all: ["auth"] as const,
  user: () => [...authKeys.all, "user"] as const,
  session: () => [...authKeys.all, "session"] as const,
};

// Get current user query
export const useUser = () => {
  return useQuery<TUserResponse>({
    // ✅ Add types
    queryKey: authKeys.user(),
    queryFn: authApi.getCurrentUser,
    enabled: !!cookieStorage.get("token"), // Only fetch if token exists
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false, // Don't retry on auth errors
  });
};

// Login mutation
export const useLogin = () => {
  const navigate = useNavigate();
  const login = useAuthStore((store) => store.login);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      // Store token
      cookieStorage.set("token", data.token, {
        expires: 1,
        secure: import.meta.env.PROD,
        sameSite: "Lax",
      });

      // Update user query cache
      login(data.user);
      queryClient.setQueryData(authKeys.user(), data.user);

      // Navigate to dashboard
      navigate(publicRoutes.DASHBOARD);

      toast.success("Login successful!");
    },
    onError: (error: TApiError) => {
      const message =
        error.response?.data?.message || error.message || "Login failed";
      toast.error(message);
    },
  });
};

// Google login mutation
export const useGoogleLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.googleLogin,
    onSuccess: (data) => {
      cookieStorage.set("token", data.token, {
        expires: 1,
        secure: import.meta.env.PROD,
        sameSite: "Lax",
      });

      queryClient.setQueryData(authKeys.user(), data.user);
      navigate(publicRoutes.DASHBOARD);
      toast.success("Google login successful!");
    },
    onError: (error: TApiError) => {
      const message = error.response?.data?.message || "Google login failed";
      toast.error(message);
    },
  });
};

// Logout mutation
export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      // Remove token
      cookieStorage.remove("token");

      // Clear the entire storage including reset all store state
      useAuthStore.persist.clearStorage();

      // Clear all queries
      queryClient.clear();

      // Navigate to login
      navigate(publicRoutes.LOGIN);

      toast.success("Logged out successfully");
    },
    onError: () => {
      // Even if logout fails on server, clear local data
      cookieStorage.remove("token");
      queryClient.clear();
      navigate("/login");
    },
  });
};

// Auth status checker
export const useAuthStatus = () => {
  const { data: user, isLoading, error } = useUser();

  return {
    user: user || null, // ✅ Explicit null for better type safety
    isAuthenticated: !!user,
    isLoading,
    error: error || null, // ✅ Explicit null for better type safety
  };
};
