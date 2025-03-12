import { getAccessToken } from "../utils/storage.ts";
import LoginOrRegister from "./LoginOrRegister.tsx";
import { IoSearchOutline } from "react-icons/io5";
import { RiShoppingBag3Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import UserMenu from "./UserMenu.tsx";
import { TbEyeSpark } from "react-icons/tb";
import { useEffect, useState } from "react";
import { useCart } from "../contexts/CartContext.tsx";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { products } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`header bg-secondary-color pt-5 ${
        isScrolled ? "fixed z-10 top-0 w-full" : "relative"
      }`}
    >
      <div className="flex justify-center items-center">
        <button className="bg-secondary-color hover:scale-110" type="button">
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
        <button
          data-modal-target="top-left-modal"
          data-modal-toggle="top-left-modal"
          className="relative flex items-center justify-center py-2 px-3 mr-2 hover:scale-110 cursor-pointer"
        >
          <RiShoppingBag3Line size={30} />
          {products.length > 0 && (
            <span className="absolute top-1 right-2 transform translate-x-1/4 -translate-y-1/4 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-red-100 bg-main-color rounded-full">
              {products.reduce((acc, product) => acc + product.quantity, 0)}
            </span>
          )}
        </button>
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
                  to="/products"
                >
                  Products <TbEyeSpark className="pl-1" />
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
