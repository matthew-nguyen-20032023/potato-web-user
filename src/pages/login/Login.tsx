import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { loginAPI } from "../../api/auth.ts";
import {
  getAccessToken,
  setAccessToken,
  setRefreshToken,
} from "../../utils/storage.ts";

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

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      toast.warning("Please input email and password.");
      return;
    }

    try {
      const response = await loginAPI(email, password);
      toast.success(response.message);
      setAccessToken(response.data.access_token);
      setRefreshToken(response.data.refresh_token);
      navigate("/");
    } catch (err) {
      toast.warning(
        err?.response?.data?.message || "An unknown error occurred."
      );
    }
  };

  return (
    <form onSubmit={handleLogin} className="max-w-md mx-auto">
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="email"
          name="floating_email"
          id="floating_email"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-b-orange-300 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label
          htmlFor="floating_email"
          className="peer-focus:font-medium absolute text-sm text-gray-900 dark:text-black-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 start-0 peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-orange-300 peer-focus:dark:text-orange-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Email address
        </label>
      </div>
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="password"
          name="floating_password"
          id="floating_password"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-b-orange-300 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label
          htmlFor="floating_password"
          className="peer-focus:font-medium absolute text-sm text-black-500 dark:text-black-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 start-0 peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-orange-300 peer-focus:dark:text-orange-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Password
        </label>
      </div>
      <button
        type="submit"
        className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-orange-400 dark:hover:bg-orange-500 dark:focus:ring-orange-800"
      >
        Submit
      </button>
    </form>
  );
}
