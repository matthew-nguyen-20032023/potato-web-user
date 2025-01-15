import { getAccessToken } from "../utils/storage.ts";
import LoginOrRegister from "./LoginOrRegister.tsx";
import { IoSearchOutline } from "react-icons/io5";
import { RiShoppingBag3Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import UserMenu from "./UserMenu.tsx";

export default function Header() {
  return (
    <div className="header bg-secondary-color pt-5">
      <div className="flex justify-center items-center">
        <button className="bg-secondary-color" type="button">
          <IoSearchOutline size={35} />
        </button>
        <h1 className="flex justify-center">
          <img
            onClick={() => (window.location.href = "/")}
            className="w-1/4 hover:cursor-pointer hover:scale-110"
            src="/src/assets/Logo_v2-01.webp"
            alt=""
          />
        </h1>
        <Link className="block py-2 px-3 hover:scale-110" to="/cart">
          <RiShoppingBag3Line size={30} />
        </Link>
        {!getAccessToken() && <LoginOrRegister />}
        {getAccessToken() && <UserMenu />}
      </div>

      <nav className="flex justify-center">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-sticky"
          >
            <ul className="flex">
              <li>
                <Link className="block py-2 px-3 hover:scale-110" to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className="hover:scale-110 py-2 px-3 flex items-center"
                  to="/Products"
                >
                  Products
                  <svg
                    className="w-2.5 h-2.5 ms-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </Link>
              </li>
              <li>
                <Link
                  className="hover:scale-110 block py-2 px-3"
                  to="/about-us"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link className="hover:scale-110 block py-2 px-3 " to="/FAQ">
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  className="hover:scale-110 block py-2 px-3 "
                  to="/contact"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
