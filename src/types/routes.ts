export const publicRoutes = {
  HOME: "/",
  LOGIN: "/login",
  DASHBOARD: "/dashboard",
  SHOP: "/shop",
  SHOP_DETAILS: "/shop/:id",
  CATEGORY: "/category/:type",
  CHECKOUT: "/checkout",
  TRANSACTION_RESULT: "/transaction-result",
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
