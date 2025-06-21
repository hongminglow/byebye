import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { Suspense, useEffect } from "react";
import { theme } from "./utils/theme";
import { LoadingSpinner } from "@/components/ui/loading/LoadingSpinner";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryProvider } from "./providers/QueryProvider";
import { ThemeProvider } from "next-themes";
import { Toaster } from "./components/ui/toast/Sonner";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

function App() {
  useEffect(() => {
    // Initialize theme on app start
    theme.init();
  }, []);

  return (
    <QueryProvider>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
          <Suspense fallback={<LoadingSpinner />}>
            <RouterProvider router={router} />
            <Toaster />
          </Suspense>
        </ThemeProvider>
      </GoogleOAuthProvider>
    </QueryProvider>
  );
}

/* Alternative Declarative JSX Syntax */
// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path={publicRoutes.LOGIN} element={<Login />} />
//         <Route path="/" element={<Layout />}>
//           <Route
//             index
//             element={
//               <ProtectedRoute requireAuth={false}>
//                 <Home />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path={publicRoutes.DASHBOARD}
//             element={
//               <ProtectedRoute>
//                 <Dashboard />
//               </ProtectedRoute>
//             }
//           />
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// }

export default App;
