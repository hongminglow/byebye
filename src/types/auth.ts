export type TUser = {
  id: string;
  email: string;
  roles: TRole[];
  permissions: TPermission[];
};

export enum TRoleType {
  ADMIN = "admin",
  USER = "user",
}

export type TUserResponse = {
  id: string;
  email: string;
  name: string;
  password: string;
  roles: TRole[];
  permissions: TPermission[];
};

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

export interface TRole {
  id: string;
  name: string;
  permissions: TPermission[];
}

export type TPermission = {
  id: string;
  name: string;
  resource: string;
  action: string;
};

export const PERMISSIONS = {
  DASHBOARD_VIEW: "dashboard:view",
  DASHBOARD_EDIT: "dashboard:edit",

  // Reports
  REPORTS_VIEW: "reports:view",
  REPORTS_CREATE: "reports:create",
  REPORTS_DELETE: "reports:delete",
} as const;

export type PermissionKey = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];
