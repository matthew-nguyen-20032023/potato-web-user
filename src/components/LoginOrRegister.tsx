import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function LoginOrRegister() {
  return (
    <>
      <button
        id="dropdownHoverButton"
        data-dropdown-toggle="dropdownHover"
        data-dropdown-trigger="hover"
        className="bg-secondary-color text-sm px-5 py-2.5 text-center inline-flex items-center hover:scale-110"
        type="button"
      >
        <FaUser size={25} />{" "}
        <svg
          className="w-2.5 h-2.5 ms-3"
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
      </button>

      <div
        id="dropdownHover"
        className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-white"
      >
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownHoverButton"
        >
          <li>
            <Link
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-white"
              to="/login"
            >
              Login
            </Link>
          </li>
          <li>
            <Link
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-white"
              to="/register"
            >
              Create account
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
