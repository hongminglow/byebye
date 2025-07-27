import { createBrowserRouter, type RouteObject } from "react-router";
import { adminRoutes, publicRoutes, userRoutes } from "@/types/routes";

// Component imports
import { Layout } from "@/components/layout/Layout";
import { lazy } from "react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { PERMISSIONS, TRoleType } from "@/types/auth";

// Lazy loading for all components
const LoginPage = lazy(() =>
  import("@/pages/auth/Login").then((module) => ({ default: module.Login }))
);
const HomePage = lazy(() =>
  import("@/pages/home/Home").then((module) => ({ default: module.Home }))
);
const ShopPage = lazy(() =>
  import("@/pages/shop/Shop").then((module) => ({ default: module.Shop }))
);
const CategoryPage = lazy(() =>
  import("@/pages/category/Category").then((module) => ({
    default: module.Category,
  }))
);
const CheckoutPage = lazy(() =>
  import("@/pages/payment/Checkout").then((module) => ({
    default: module.Checkout,
  }))
);
const TransactionResultPage = lazy(() =>
  import("@/pages/payment/TransactionResult").then((module) => ({
    default: module.TransactionResult,
  }))
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
            path: publicRoutes.SHOP_DETAILS,
            element: (
              <ProtectedRoute>
                <ShopPage />
              </ProtectedRoute>
            ),
            loader: async () => {
              return { message: "Welcome to the Shop Page!" };
            },
          },

          {
            path: publicRoutes.CATEGORY,
            element: (
              <ProtectedRoute>
                <CategoryPage />
              </ProtectedRoute>
            ),
            loader: async () => {
              return { message: "Welcome to the Category Page!" };
            },
          },

          {
            path: publicRoutes.CHECKOUT,
            element: (
              <ProtectedRoute>
                <CheckoutPage />
              </ProtectedRoute>
            ),
            loader: async () => {
              return { message: "Welcome to the Shop Page!" };
            },
          },
          {
            path: publicRoutes.TRANSACTION_RESULT,
            element: (
              <ProtectedRoute>
                <TransactionResultPage />
              </ProtectedRoute>
            ),
            loader: async () => {
              return { message: "Welcome to the Transaction Result Page!" };
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
                roles={TRoleType.ADMIN}
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
