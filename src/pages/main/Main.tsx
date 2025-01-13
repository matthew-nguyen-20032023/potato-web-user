import { RiShoppingBag3Line } from "react-icons/ri";
import { Outlet, Link, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { getAccessToken } from "../../utils/storage.ts";
import UserMenu from "../../components/UserMenu.tsx";
import ProductList from "../../components/ProductList.tsx";
// import Footer from "../../components/Footer.tsx";

export function Main() {
  const location = useLocation();
  const showProductListRoutes = ["/"];
  const showProductList = showProductListRoutes.includes(location.pathname);

  return (
    <div>
      <nav className="bg-white border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src="/src/assets/logo.png" className="h-24" alt="Potato" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-black">
              Potato
            </span>
          </a>

          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white">
              <li className="flex items-center">
                <Link className="text-black" to="/cart">
                  <RiShoppingBag3Line size={40} />
                </Link>
              </li>
              {getAccessToken() && (
                <li>
                  <UserMenu />
                </li>
              )}
              {!getAccessToken() && (
                <li className="flex items-center">
                  <Link className="text-black" to="/login">
                    Login
                  </Link>
                </li>
              )}
              {!getAccessToken() && (
                <li className="flex items-center">
                  <Link className="text-black" to="/register">
                    Register
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
      {showProductList && <ProductList />}
      <ToastContainer />
      <Outlet />
      {/*<Footer />*/}
    </div>
  );
}
