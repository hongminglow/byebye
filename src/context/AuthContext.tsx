// src/contexts/AuthContext.tsx
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { TUser, PermissionKey } from "@/types/auth";

interface AuthContextType {
  user: TUser | null;
  isAuthenticated: boolean;
  hasPermission: (permission: PermissionKey | PermissionKey[]) => boolean;
  hasRole: (role: string | string[]) => boolean;
  login: (user: TUser) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<TUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize auth state
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      // Check if user is logged in (localStorage, API call, etc.)
      const token = localStorage.getItem("auth_token");
      if (token) {
        // Fetch user data with permissions
        const userData = await fetchUserData();
        setUser(userData);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const hasPermission = (
    permission: PermissionKey | PermissionKey[]
  ): boolean => {
    if (!user) return false;

    const permissions = Array.isArray(permission) ? permission : [permission];
    const userPermissions = [
      ...user.permissions.map((p) => p.name),
      ...user.roles.flatMap((role) => role.permissions.map((p) => p.name)),
    ];

    return permissions.some((perm) => userPermissions.includes(perm));
  };

  const hasRole = (role: string | string[]): boolean => {
    if (!user) return false;

    const roles = Array.isArray(role) ? role : [role];
    const userRoles = user.roles.map((r) => r.name);

    return roles.some((r) => userRoles.includes(r));
  };

  const login = (userData: TUser) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth_token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        hasPermission,
        hasRole,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

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
