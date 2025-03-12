import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPasswordAPI, resetPasswordAPI } from "../../api/auth.ts";
import { getAccessToken } from "../../utils/storage.ts";
import { showMessageError, showMessageSuccess } from "../../alerts/alert.ts";
import { Spinning } from "../../components/Spinning.tsx";

export function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [confirmCode, setConfirmCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isSpinner, setIsSpinner] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);

  // if user already login, redirect to home page
  const navigate = useNavigate();
  useEffect(() => {
    if (getAccessToken()) {
      navigate("/");
    }
  }, [navigate]);

  const handleForgotPassword = async () => {
    setIsSpinner(true);
    if (!email) {
      setIsSpinner(false);
      return showMessageError("Please input email.");
    }

    try {
      const response = await forgotPasswordAPI(email);
      showMessageSuccess(response.message);
      setIsCodeSent(true);
    } catch (err) {
      showMessageError(err);
    } finally {
      setIsSpinner(false);
    }
  };

  const handleResetPassword = async () => {
    setIsSpinner(true);
    if (!confirmCode) {
      setIsSpinner(false);
      return showMessageError(
        "Please input confirm code that we have sent in your email."
      );
    }
    if (!newPassword) {
      setIsSpinner(false);
      return showMessageError("Please input your new password.");
    }

    try {
      const response = await resetPasswordAPI(email, confirmCode, newPassword);
      showMessageSuccess(response.message);
      setIsCodeSent(true);
      navigate("/login");
    } catch (err) {
      showMessageError(err);
    } finally {
      setIsSpinner(false);
    }
  };

  return (
    <div className="mb-8">
      <h1 className="m-4 secondary-color">Forgot Password</h1>
      {!isCodeSent && (
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
          <button
            className="bg-main-color text-white w-full rounded-xl mb-5"
            onClick={handleForgotPassword}
          >
            {isSpinner && <Spinning />}
            {!isSpinner && "Submit"}
          </button>
        </div>
      )}
      {isCodeSent && (
        <div className="max-w-md mx-auto border border-black rounded-xl p-6">
          <div>
            <h3>We have sent the code to your email ฅ(•˕ •マ⟆</h3>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="floating_confirm_code"
              id="floating_confirm_code"
              className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-b-lime-900 focus:outline-none focus:ring-0 peer"
              placeholder=" "
              value={confirmCode}
              onChange={(e) => setConfirmCode(e.target.value)}
            />
            <label
              htmlFor="floating_confirm_code"
              className="peer-focus:font-medium absolute text-sm dark:text-black-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 start-0 peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-lime-900 peer-focus:dark:text-lime-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Confirm Code (<span className="text-red-800">*</span>)
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              name="floating_new_password"
              id="floating_new_password"
              className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-b-lime-900 focus:outline-none focus:ring-0 peer"
              placeholder=" "
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <label
              htmlFor="floating_new_password"
              className="peer-focus:font-medium absolute text-sm dark:text-black-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 start-0 peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-lime-900 peer-focus:dark:text-lime-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              New Password (<span className="text-red-800">*</span>)
            </label>
          </div>
          <button
            className="bg-main-color text-white w-full rounded-xl mb-5"
            onClick={handleResetPassword}
          >
            {isSpinner && <Spinning />}
            {!isSpinner && "Submit"}
          </button>
        </div>
      )}
    </div>
  );
}
