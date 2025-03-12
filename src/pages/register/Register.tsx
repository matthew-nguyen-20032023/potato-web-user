import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { showMessageError, showMessageSuccess } from "../../alerts/alert.ts";
import { registerAPI } from "../../api/auth.ts";
import { Spinning } from "../../components/Spinning.tsx";

export function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const navigate = useNavigate();
  const [isSpinner, setIsSpinner] = useState(false);

  const handleRegister = async () => {
    setIsSpinner(true);
    if (!email || !password || !confirmPassword || !name || !phone) {
      setIsSpinner(false);
      return showMessageError("Please fill all required!");
    }
    if (password !== confirmPassword) {
      setIsSpinner(false);
      return showMessageError(
        "Password and confirm password must be the same!"
      );
    }

    try {
      const response = await registerAPI(
        email,
        password,
        name,
        phone,
        referralCode
      );
      showMessageSuccess(response.message);
      navigate(`/verify-email?email=${email}`);
    } catch (err) {
      showMessageError(err);
    } finally {
      setIsSpinner(false);
    }
  };

  return (
    <div>
      <h1 className="secondary-color mb-3">Register</h1>
      <div className="max-w-md mx-auto border border-black rounded-xl p-6 mb-4">
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            name="floating_email"
            id="floating_email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-b-lime-900 focus:outline-none focus:ring-0  peer"
            placeholder=" "
            onChange={(e) => setEmail(e.target.value)}
          />
          <label
            htmlFor="floating_email"
            className="peer-focus:font-medium absolute text-sm text-gray-900 dark:text-black-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 start-0 peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-lime-900 peer-focus:dark:text-lime-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email address (<span className="text-red-800">*</span>)
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="floating_password"
            id="floating_password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-b-lime-900 focus:outline-none focus:ring-0  peer"
            placeholder=" "
            onChange={(e) => setPassword(e.target.value)}
          />
          <label
            htmlFor="floating_password"
            className="peer-focus:font-medium absolute text-sm text-black-500 dark:text-black-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 start-0 peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-lime-900 peer-focus:dark:text-lime-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password (<span className="text-red-800">*</span>)
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="floating_confirm_password"
            id="floating_confirm_password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-b-lime-900 focus:outline-none focus:ring-0  peer"
            placeholder=" "
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <label
            htmlFor="floating_confirm_password"
            className="peer-focus:font-medium absolute text-sm text-black-500 dark:text-black-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 start-0 peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-lime-900 peer-focus:dark:text-lime-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Confirm password (<span className="text-red-800">*</span>)
          </label>
        </div>

        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="name"
              id="name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-b-lime-900 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              onChange={(e) => setName(e.target.value)}
            />
            <label
              htmlFor="name"
              className="peer-focus:font-medium absolute text-sm text-black-500 dark:text-black-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 start-0 peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-lime-900 peer-focus:dark:text-lime-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Name (<span className="text-red-800">*</span>)
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="phone"
              id="phone"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-b-lime-900 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              onChange={(e) => setPhone(e.target.value)}
            />
            <label
              htmlFor="phone"
              className="peer-focus:font-medium absolute text-sm text-black-500 dark:text-black-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 start-0 peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-lime-900 peer-focus:dark:text-lime-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Phone (<span className="text-red-800">*</span>)
            </label>
          </div>
        </div>
        <div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="referral_code"
              id="referral_code"
              className="block py-2.5 px-0 w-full text-xs text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-b-lime-900 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              onChange={(e) => setReferralCode(e.target.value)}
            />
            <label
              htmlFor="referral_code"
              className="peer-focus:font-medium absolute text-sm text-black-500 dark:text-black-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 start-0 peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-lime-900 peer-focus:dark:text-lime-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Referral code (<span>optional</span>)
            </label>
          </div>
        </div>
        <div className="mb-5">
          <div className="flex">
            Already have an account?{" "}
            <Link className="ml-1 hover:scale-110" to="/login">
              Login
            </Link>
          </div>
        </div>
        <button
          className="bg-main-color text-white w-full rounded-xl"
          onClick={handleRegister}
        >
          {isSpinner && <Spinning />}

          {!isSpinner && "Submit"}
        </button>
      </div>
    </div>
  );
}
