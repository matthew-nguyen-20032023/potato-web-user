import { Outlet, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Welcome from "../../components/Welcome.tsx";
import Header from "../../components/Header.tsx";
import Intro from "../../components/Intro.tsx";
import Event from "../../components/Event.tsx";
import Footer from "../../components/Footer.tsx";

export function Main() {
  const location = useLocation();
  const showProductListRoutes = ["/"];
  const showProductList = showProductListRoutes.includes(location.pathname);

  return (
    <div className="max-h-screen overflow-y-auto scroll-container">
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
