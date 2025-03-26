export const paypalConfig = {
  clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID as string,
  currency: "USD",
  intent: "capture",
};
export const cacheColor = "colors";
export const cacheCategory = "categories";
export const cacheCart = "cart";
