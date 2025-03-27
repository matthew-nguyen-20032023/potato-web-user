export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const calculateDiscount = (price: number = 0, discount: number = 0) => {
  return (price - (price * discount) / 100).toFixed(2);
};
