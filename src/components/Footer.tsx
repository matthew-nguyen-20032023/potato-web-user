import { FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <footer className="bg-secondary-color">
        <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
          <div className="md:flex md:justify-between">
            <div className="mb-6 md:mb-0">
              <a href="/" className="flex items-center hover:scale-110">
                <img
                  src="/src/assets/Logo_v2-01.webp"
                  className="h-12 me-3"
                  alt="FlowBite Logo"
                />
              </a>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
              <div>
                <h2 className="mb-6 text-sm font-semibold secondary-color">
                  HELP
                </h2>
                <ul className="secondary-color font-medium">
                  <li className="mb-4 hover:scale-110">
                    <Link className="block hover:scale-110" to="/about-us">
                      About us
                    </Link>
                  </li>
                  <li className="mb-4 hover:scale-110">
                    <Link
                      className="block hover:scale-110"
                      to="/shipping-return"
                    >
                      Shipping & returns
                    </Link>
                  </li>
                  <li className="mb-4 hover:scale-110">
                    <Link className="block hover:scale-110" to="/FAQ">
                      Faq
                    </Link>
                  </li>
                  <li className="mb-4 hover:scale-110">
                    <Link className="block hover:scale-110" to="/contact">
                      Contact us
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="mb-6 text-sm font-semibold secondary-color uppercase">
                  Follow us
                </h2>
                <ul className="secondary-color font-medium">
                  <li className="mb-4 hover:scale-110">
                    <div className="flex items-center justify-center">
                      <a
                        href="https://www.instagram.com/"
                        target="_blank"
                        className="mr-1 hover:scale-110"
                      >
                        <FaInstagram size={35} />
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="mb-6 text-sm font-semibold secondary-color uppercase">
                  Legal
                </h2>
                <ul className="secondary-color font-medium">
                  <li className="mb-4 hover:scale-110">
                    <Link
                      className="block hover:scale-110"
                      to="/privacy-policy"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li className="hover:scale-110">
                    <Link
                      className="block hover:scale-110"
                      to="/terms-conditions"
                    >
                      Terms &amp; Conditions
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <div className="sm:flex sm:items-center sm:justify-between">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
              © 2023 <a href="#">Potato™</a>. All Rights Reserved.
            </span>
            <div className="flex mt-4 sm:justify-center sm:mt-0">
              <a href="#" className="secondary-color hover:scale-110"></a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
