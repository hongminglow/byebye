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
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
        loader: async () => {
          return { message: "Welcome to the Home Page!" };
        },
      },
      {
        path: publicRoutes.SHOP_DETAILS,
        element: <ShopPage />,
        loader: async () => {
          return { message: "Welcome to the Shop Page!" };
        },
      },
      {
        path: publicRoutes.CATEGORY,
        element: <CategoryPage />,
        loader: async () => {
          return { message: "Welcome to the Category Page!" };
        },
      },
      {
        path: publicRoutes.CHECKOUT,
        element: <CheckoutPage />,
        loader: async () => {
          return { message: "Welcome to the Shop Page!" };
        },
      },
      {
        path: publicRoutes.TRANSACTION_RESULT,
        element: <TransactionResultPage />,
        loader: async () => {
          return { message: "Welcome to the Transaction Result Page!" };
        },
      },
      {
        path: userRoutes.CONTACT,
        element: <ContactPage />,
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
            permissions={PERMISSIONS.REPORTS_VIEW}
            roles={TRoleType.ADMIN}
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
  {
    path: publicRoutes.LOGIN,
    element: (
      <ProtectedRoute
        requireAuth={false}
        redirectWhenAuthenticated={publicRoutes.HOME}
      >
        <LoginPage />
      </ProtectedRoute>
    ),
  },
  {
    path: publicRoutes.ERROR,
    element: <ErrorPage />,
  },
  {
    path: publicRoutes.GOOGLE_CALLBACK,
    element: (
      <ProtectedRoute
        requireAuth={false}
        redirectWhenAuthenticated={publicRoutes.HOME}
      >
        <GoogleCallback />
      </ProtectedRoute>
    ),
  },
  { path: "*", element: <ErrorPage /> },
];

export const router = createBrowserRouter(routeConfig);
