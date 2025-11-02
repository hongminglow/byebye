import { PermissionKey } from "@/types/auth";
import { useAuthStore } from "../store/useAuthStore";

export const usePermissions = () => {
  const { hasPermission, hasRole } = useAuthStore();

  const can = (permission: PermissionKey | PermissionKey[]) => {
    return hasPermission(permission);
  };

  const cannot = (permission: PermissionKey | PermissionKey[]) => {
    return !hasPermission(permission);
  };

  const is = (role: string | string[]) => {
    return hasRole(role);
  };

  return { can, cannot, is, hasPermission, hasRole };
};
