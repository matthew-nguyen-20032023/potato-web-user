import { Outlet, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Welcome from "../../components/Welcome.tsx";
import Header from "../../components/Header.tsx";
import Intro from "../../components/Intro.tsx";
import Event from "../../components/Event.tsx";
import { Cart } from "../cart/Cart.tsx";
import Footer from "../../components/Footer.tsx";

export function Main() {
  const location = useLocation();
  const showProductListRoutes = ["/"];
  const showProductList = showProductListRoutes.includes(location.pathname);

  return (
    <div>
      <Welcome />
      <Header />
      <Intro />
      {showProductList && <Event />}
      <Cart />
      <ToastContainer />
      <Outlet />
      <Footer />
    </div>
  );
}
