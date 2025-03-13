import Intro from "@/components/Intro.tsx";
import Event from "@/components/Event.tsx";
import Header from "@/components/Header.tsx";
import Footer from "@/components/Footer.tsx";
import Welcome from "@/components/Welcome.tsx";
import { ToastContainer } from "react-toastify";
import { Outlet, useLocation } from "react-router-dom";

export function Main() {
  const location = useLocation();
  const showProductListRoutes = ["/"];
  const showProductList = showProductListRoutes.includes(location.pathname);

  return (
    <div className="max-h-screen overflow-y-auto scroll-container bg-list-product-color">
      <Welcome />
      <Header />
      <Intro />
      {showProductList && <Event />}
      <ToastContainer />
      <Outlet />
      <Footer />
    </div>
  );
}
