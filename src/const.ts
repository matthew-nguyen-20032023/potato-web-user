export const paypalConfig = {
  clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID as string,
  currency: "USD",
  intent: "capture",
};
