import { Bounce, toast } from "react-toastify";

export const showMessageError = (
  error: string | { response: { data: { message: string } } } | unknown
) => {
  const message =
    typeof error === "string"
      ? error
      : error?.response?.data?.message || "An unknown error occurred.";
  toast(`₍^. .^₎⟆ ${message} (•˕ •マ.ᐟ`, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });
};

export const showMessageSuccess = (message: string) => {
  toast(`(˶˃ ᵕ ˂˶)ა🍓 ${message} 😻`, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });
};
