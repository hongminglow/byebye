import { Outlet } from "react-router";
import { Footer } from "./Footer";
import { Header } from "./Header";

export const Layout = () => {
  return (
    <div className="min-h-screen grid grid-rows-[auto_1fr_auto] ">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
