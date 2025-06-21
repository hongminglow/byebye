import { createBrowserRouter, type RouteObject } from "react-router";
import { adminRoutes, publicRoutes, userRoutes } from "@/types/routes";

// Component imports
import { Layout } from "@/components/layout/Layout";
import { lazy } from "react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { PERMISSIONS } from "@/types/auth";

// Lazy loading for all components
const LoginPage = lazy(() =>
  import("@/pages/auth/Login").then((module) => ({ default: module.Login }))
);
const HomePage = lazy(() =>
  import("@/pages/home/Home").then((module) => ({ default: module.Home }))
);
const ErrorPage = lazy(() =>
  import("@/pages/error/ErrorPage").then((module) => ({
    default: module.ErrorPage,
  }))
);
const GoogleCallback = lazy(() =>
  import("@/pages/auth/GoogleCallback").then((module) => ({
    default: module.GoogleCallback,
  }))
);
const DashboardPage = lazy(() =>
  import("@/pages/dashboard/Dashboard").then((module) => ({
    default: module.Dashboard,
  }))
);
const ContactPage = lazy(() =>
  import("@/pages/contact/Contact").then((module) => ({
    default: module.Contact,
  }))
);
const ReportPage = lazy(() =>
  import("@/pages/report/Report").then((module) => ({ default: module.Report }))
);

export const routeConfig: RouteObject[] = [
  {
    path: "/",
    errorElement: <ErrorPage />,
    children: [
      {
        path: publicRoutes.LOGIN,
        element: <LoginPage />,
      },
      {
        path: publicRoutes.ERROR,
        element: <ErrorPage />,
      },
      {
        path: publicRoutes.GOOGLE_CALLBACK,
        element: <GoogleCallback />,
      },
      {
        path: "/",
        element: <Layout />,
        children: [
          {
            index: true,
            element: (
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            ),
            loader: async () => {
              return { message: "Welcome to the Home Page!" };
            },
          },
          {
            path: publicRoutes.DASHBOARD,
            element: (
              <ProtectedRoute
                permissions={PERMISSIONS.DASHBOARD_VIEW}
                fallback={
                  <div>You don't have permission to view dashboard</div>
                }
              >
                <DashboardPage />
              </ProtectedRoute>
            ),
            loader: async () => {
              // Fetch dashboard data
              return { dashboardData: "Dashboard content" };
            },
          },
          {
            path: userRoutes.CONTACT,
            element: (
              <ProtectedRoute>
                <ContactPage />
              </ProtectedRoute>
            ),
            action: async ({ request }) => {
              const formData = await request.formData();
              return fetch("/api/contact", {
                method: "POST",
                body: formData,
              });
            },
          },
          {
            path: adminRoutes.REPORT,
            element: (
              <ProtectedRoute
                roles="admin"
                permissions={PERMISSIONS.REPORTS_VIEW}
              >
                <ReportPage />
              </ProtectedRoute>
            ),
            loader: async () => {
              return fetch("/api/reports");
            },
          },
        ],
      },
      { path: "*", element: <ErrorPage /> },
    ],
  },
];

export const router = createBrowserRouter(routeConfig);
