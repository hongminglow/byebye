import { PermissionKey, TUser } from "@/types/auth";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { cookieStorage } from "@/utils/cookies";
import { googleAuthService } from "@/services/googleAuth";

interface AuthState {
  // State
  user: TUser | null;
  loading: boolean;
  error: string | null;

  // Actions
  login: (user: TUser) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  // Computed/Getters
  isAuthenticated: () => boolean;
  hasPermission: (permission: PermissionKey | PermissionKey[]) => boolean;
  hasRole: (role: string | string[]) => boolean;

  // Async actions
  checkAuthStatus: () => Promise<void>;
  loginWithGoogle: (credentials: string) => Promise<boolean>;
  loginWithCredentials: (email: string, password: string) => Promise<boolean>;
  handleGoogleCallback: (code: string) => Promise<void>;
}

const initialState = {
  user: null,
  loading: false,
  error: null,
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      ...initialState,
      // Actions
      /* Clear Entire Store if passing second argument as true to the set function */
      login: (user: TUser) => {
        set({ user, error: null });
      },

      logout: () => {
        cookieStorage.remove("token");
        set({ user: null, error: null });
      },

      setLoading: (loading: boolean) => {
        set({ loading }, false);
      },

      setError: (error: string | null) => {
        set({ error }, false);
      },

      // Computed values
      isAuthenticated: () => {
        const { user } = get();
        const token = cookieStorage.get("token");

        // Must have both user and valid token
        const isAuth =
          !!user && !!token && token !== "undefined" && token !== "null";

        return isAuth;
      },

      hasPermission: (permission: PermissionKey | PermissionKey[]) => {
        const { user } = get();
        if (!user) return false;

        const permissions = Array.isArray(permission)
          ? permission
          : [permission];
        const userPermissions = [
          ...user.permissions.map((p) => p.name),
          ...user.roles.flatMap((role) => role.permissions.map((p) => p.name)),
        ];

        return permissions.some((perm) => userPermissions.includes(perm));
      },

      hasRole: (role: string | string[]) => {
        const { user } = get();
        if (!user) return false;

        const roles = Array.isArray(role) ? role : [role];
        const userRoles = user.roles.map((r) => r.name);

        return roles.some((r) => userRoles.includes(r));
      },

      // Async actions
      checkAuthStatus: async () => {
        try {
          set({ loading: true, error: null });

          const token = cookieStorage.get("token");

          if (token) {
            const userData = await fetchUserData();
            set({ user: userData, loading: false });
          } else {
            set({ loading: false });
          }
        } catch (error) {
          console.error("Auth check failed:", error);
          set({
            error: "Failed to check authentication status",
            loading: false,
          });
        }
      },

      loginWithCredentials: async (email: string, password: string) => {
        try {
          set({ loading: true, error: null });
          const userData = await fetchUserData();
          // API call
          //   const response = await fetch("/api/auth/login", {
          //     method: "POST",
          //     headers: { "Content-Type": "application/json" },
          //     body: JSON.stringify({ email, password }),
          //   });

          //   if (!response.ok) {
          //     throw new Error("Login failed");
          //   }

          //   const { user, token } = await response.json();
          if (email && password) {
            cookieStorage.set("token", "mocked_token", {
              expires: 1, // 1 day for access token
              secure: true,
              sameSite: "Lax",
            });
            set({ user: userData, loading: false });
            return true;
          }
          return false;
        } catch (e) {
          console.error(e);
          set({
            error: "Login failed. Please check your credentials.",
            loading: false,
          });
          return false;
        }
      },

      loginWithGoogle: async (credentials: string): Promise<boolean> => {
        // const authUrl = googleAuthService.getAuthUrl();
        // window.location.href = authUrl;
        const userData = await fetchUserData();
        // const { id, name, email } = googleAuthService.parseIdToken(credentials);

        if (credentials) {
          cookieStorage.set("token", credentials, {
            expires: 1, // 1 day for access token
            secure: true,
            sameSite: "Lax",
          });
          set({ user: userData, loading: false });
          return true;
        }
        return false;
      },
      handleGoogleCallback: async (code: string) => {
        try {
          set({ loading: true, error: null });

          // Exchange code for tokens
          const tokens = await googleAuthService.exchangeCodeForTokens(code);

          // Get user info
          const googleUser = await googleAuthService.getUserInfo(
            tokens.access_token
          );

          // Send to your backend for validation/registration
          const response = await fetch("/api/auth/google", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              googleUser,
              accessToken: tokens.access_token,
              idToken: tokens.id_token,
            }),
          });

          if (!response.ok) {
            throw new Error("Google authentication failed");
          }

          const { user, token, refreshToken } = await response.json();

          // Store tokens
          cookieStorage.set("token", token, {
            expires: 1,
            secure: import.meta.env.PROD,
            sameSite: "Lax",
          });

          if (refreshToken) {
            cookieStorage.set("refreshToken", refreshToken, {
              expires: 30,
              secure: import.meta.env.PROD,
              sameSite: "Lax",
              httpOnly: true,
            });
          }

          set({
            user: {
              ...user,
              provider: "google" as const,
              picture: googleUser.picture,
            },
            loading: false,
          });
        } catch (error) {
          console.error(error);
          set({
            error: "Google authentication failed. Please try again.",
            loading: false,
          });
        }
      },
    }),
    {
      name: "auth-store",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        user: state.user,
      }),
    }
  )
);

async function fetchUserData(): Promise<TUser> {
  // Mock implementation - replace with actual API call
  return {
    id: "1",
    email: "user@example.com",
    roles: [
      {
        id: "1",
        name: "admin",
        permissions: [
          {
            id: "1",
            name: "dashboard:view",
            resource: "dashboard",
            action: "view",
          },
          {
            id: "2",
            name: "reports:view",
            resource: "reports",
            action: "view",
          },
        ],
      },
    ],
    permissions: [],
  };
}
