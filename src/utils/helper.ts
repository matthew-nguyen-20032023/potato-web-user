export const SHIPPING_FEE = 5;

export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const calculateDiscount = (price: number = 0, discount: number = 0) => {
  return (price - (price * discount) / 100).toFixed(2);
};

export const calculateTotalDiscount = (
  price: number,
  discount: number,
  quantity: number
) => {
  return ((price * discount * quantity) / 100).toFixed(2);
};

export const calculateFinalPrice = (
  price: number,
  quantity: number,
  discount: number,
  shippingFee: number
) => {
  const totalPrice = price * quantity;
  const totalDiscount = Number(
    calculateTotalDiscount(price, discount, quantity)
  );
  return (totalPrice - totalDiscount + shippingFee).toFixed(2);
};
