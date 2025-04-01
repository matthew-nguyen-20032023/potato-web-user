import { useState } from "react";
import { AppError } from "@/types.ts";
import { verifyEmailAPI } from "@/api/auth.ts";
import { useNavigate } from "react-router-dom";
import { showMessageError, showMessageSuccess } from "@/alerts/alert.ts";

export default function VerifyEmail() {
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const email = params.get("email");
  const [confirmCode, setConfirmCode] = useState("");
  const navigate = useNavigate();
  const text = "ฅ^>⩊<^ ฅ";

  const handleVerify = async () => {
    if (!confirmCode) {
      return showMessageError("Please input the confirmation code.");
    }
    if (!email) {
      return showMessageError("Invalid email address.");
    }

    try {
      const response = await verifyEmailAPI(email, confirmCode);
      showMessageSuccess(response.message);
      navigate("/login");
    } catch (err) {
      showMessageError(err as AppError);
    }
  };

  return (
    <div>
      <h1 className="secondary-color mb-5">Verify Email</h1>
      <div className="max-w-md mx-auto border border-black rounded-xl p-6 mb-4">
        <h3 className="mb-2">
          We have sent a confirmation code to email{" "}
          <span className="text-green-800">{email}</span>. Please check your
          email and input the code below to verify your email.{" "}
          <span className="text-green-800">{text}</span>
        </h3>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="confirm_code"
            id="confirm_code"
            className="block py-2.5 px-0 w-full text-xs text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-b-lime-900 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            onChange={(e) => setConfirmCode(e.target.value)}
          />
          <label
            htmlFor="confirm_code"
            className="peer-focus:font-medium absolute text-sm text-black-500 dark:text-black-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 start-0 peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-lime-900 peer-focus:dark:text-lime-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Confirm code (<span className="text-red-800">*</span>)
          </label>
        </div>
        <button
          className="bg-main-color text-white w-full rounded-xl"
          onClick={handleVerify}
        >
          Verify
        </button>
      </div>
    </div>
  );
}
