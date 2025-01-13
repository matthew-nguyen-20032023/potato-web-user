import { RiShoppingBag3Line } from "react-icons/ri";
import { Outlet, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";

export function Main() {
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
              <li>
                <Link className="text-black" to="/login">
                  Login
                </Link>
              </li>
              <li>
                <Link className="text-black" to="/register">
                  Register
                </Link>
              </li>
              <li>
                <Link className="text-black" to="/cart">
                  <RiShoppingBag3Line size={25} />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <ToastContainer />
      <Outlet />
    </div>
  );
}
