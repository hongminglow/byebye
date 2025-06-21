export type TUser = {
  id: string;
  email: string;
  roles: TRole[];
  permissions: TPermission[];
};

export type TUserResponse = {
  id: string;
  email: string;
  name: string;
  password: string;
  roles: TRole[];
  permissions: TPermission[];
};

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
