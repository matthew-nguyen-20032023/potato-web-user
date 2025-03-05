import { Bounce, toast } from "react-toastify";

export const showMessageError = (message: string) => {
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
