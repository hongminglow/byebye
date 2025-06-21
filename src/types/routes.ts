export const publicRoutes = {
  HOME: "/",
  LOGIN: "/login",
  DASHBOARD: "/dashboard",
  ERROR: "/error",
  GOOGLE_CALLBACK: "/auth/google/callback",
} as const;

export const userRoutes = {
  ...publicRoutes,
  CONTACT: "/contact",
} as const;

export const adminRoutes = {
  ...publicRoutes,
  REPORT: "/report",
} as const;

export type TPublicRoutes = typeof publicRoutes;
export type TUserRoutes = typeof userRoutes;
export type TAdminRoutes = typeof adminRoutes;
