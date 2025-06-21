// pages/error/ErrorPage.tsx - Enhanced error page
import { useRouteError, Link, ErrorResponse } from "react-router";

export const ErrorPage = () => {
  const error = useRouteError() as ErrorResponse;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-600">Oops!</h1>
        <h2 className="text-2xl font-semibold text-gray-900 mt-4">
          Something went wrong
        </h2>
        <p className="text-gray-600 mt-2 mb-4">
          {error?.statusText || "An unexpected error occurred"}
        </p>

        <div className="mt-8">
          <Link
            to="/"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
};
