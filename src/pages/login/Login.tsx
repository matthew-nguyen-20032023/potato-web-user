import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { loginAPI } from "../../api/auth.ts";
import {
  getAccessToken,
  setAccessToken,
  setRefreshToken,
} from "../../utils/storage.ts";
import { showMessageError } from "../../alerts/alert.ts";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // if user already login, redirect to home page
  const navigate = useNavigate();
  useEffect(() => {
    if (getAccessToken()) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogin = async () => {
    if (!email || !password) {
      return showMessageError("Please input email and password.");
    }

    try {
      const response = await loginAPI(email, password);
      toast.success(response.message);
      setAccessToken(response.data.access_token);
      setRefreshToken(response.data.refresh_token);
      window.location.href = "/";
    } catch (err) {
      showMessageError(err);
    }
  };

  return (
    <div className="mb-8">
      <h1 className="m-4 secondary-color">Login</h1>
      <div className="max-w-md mx-auto border border-black rounded-xl p-6">
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            name="floating_email"
            id="floating_email"
            className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-b-lime-900 focus:outline-none focus:ring-0 peer"
            placeholder=" "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label
            htmlFor="floating_email"
            className="peer-focus:font-medium absolute text-sm dark:text-black-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 start-0 peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-lime-900 peer-focus:dark:text-lime-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email address (<span className="text-red-800">*</span>)
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="floating_password"
            id="floating_password"
            className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-b-lime-900 focus:outline-none focus:ring-0 peer"
            placeholder=" "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label
            htmlFor="floating_password"
            className="peer-focus:font-medium absolute text-sm text-black-500 dark:text-black-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 start-0 peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-lime-900 peer-focus:dark:text-lime-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password (<span className="text-red-800">*</span>)
          </label>
        </div>
        <div className="flex items-center mb-5">
          <input
            type="checkbox"
            id="rememberAccount"
            name="rememberAccount"
            value="true"
          />
          <span className="ml-1">Remember me?</span>
        </div>
        <button
          className="bg-main-color text-white w-full rounded-xl mb-5"
          onClick={handleLogin}
        >
          Submit
        </button>
        <div>
          <div className="flex">
            Don't have an account?{" "}
            <Link className="ml-1 hover:scale-110" to="/register">
              Register
            </Link>
          </div>
          <div className="flex">
            <Link className="hover:scale-110" to="/forgot">
              Forgot password?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
