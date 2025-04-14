import { cacheCart } from "@/const.ts";
import { useEffect, useRef } from "react";
import Cart from "@/pages/cart/Cart.tsx";
import { useDispatch } from "react-redux";
import Intro from "@/components/Intro.tsx";
import Event from "@/components/Event.tsx";
import Header from "@/components/Header.tsx";
import Footer from "@/components/Footer.tsx";
import Welcome from "@/components/Welcome.tsx";
import { ToastContainer } from "react-toastify";
import { Outlet, useLocation } from "react-router-dom";
import { syncCartFromCache } from "@/features/cart/cartSlice.ts";

export default function Main() {
  const location = useLocation();
  const showProductListRoutes = ["/"];
  const showProductList = showProductListRoutes.includes(location.pathname);
  const cartButtonRef = useRef(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const cache = localStorage.getItem(cacheCart);
    if (cache) {
      dispatch(syncCartFromCache(JSON.parse(cache)));
    }
  }, [dispatch]);

  return (
    <div className="max-h-screen overflow-y-auto scroll-container bg-list-product-color">
      {showProductList && <Welcome />} <Header cartButtonRef={cartButtonRef} />
      {showProductList && <Intro />}
      {showProductList && <Event />}
      <ToastContainer
        toastStyle={{
          width: "17vw",
          fontSize: "1.5vh",
          height: "5vh",
        }}
      />
      <Outlet />
      <Footer />
      <Cart cartButtonRef={cartButtonRef} />
    </div>
  );
}
