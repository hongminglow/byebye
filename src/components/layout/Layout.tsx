import { Outlet } from "react-router";
import { Footer } from "./Footer";
import { Header } from "./Header";

export const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="grow flex items-center justify-center">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
