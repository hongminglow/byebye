// src/components/auth/ProtectedRoute.tsx
import { Navigate, useLocation } from "react-router-dom";
import { PermissionKey } from "@/types/auth";
import { Suspense } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useShallow } from "zustand/shallow";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  permissions?: PermissionKey | PermissionKey[];
  roles?: string | string[];
  fallback?: React.ReactNode;
  redirectTo?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAuth = true,
  permissions,
  roles,
  fallback,
  redirectTo = "/login",
}) => {
  const location = useLocation();

  const { hasPermission, hasRole, isAuthenticated, loading } = useAuthStore(
    useShallow((store) => ({
      isAuthenticated: store.isAuthenticated,
      hasPermission: store.hasPermission,
      hasRole: store.hasRole,
      loading: store.loading,
    }))
  );

  // Show loading while checking auth
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  // Check authentication
  if (requireAuth && !isAuthenticated()) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // Check permissions
  if (permissions && !hasPermission(permissions)) {
    return fallback || <Navigate to="/login" replace />;
  }

  // Check roles
  if (roles && !hasRole(roles)) {
    return fallback || <Navigate to="/login" replace />;
  }

  return <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>;
};
