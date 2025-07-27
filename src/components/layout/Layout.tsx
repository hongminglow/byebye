import { Outlet } from "react-router";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { ScrollToTop } from "../common/ScrollToTop";

export const Layout = () => {
  return (
    <div className="min-h-screen grid grid-rows-[auto_1fr_auto] ">
      <ScrollToTop />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
