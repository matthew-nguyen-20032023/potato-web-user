import backendService from "./backend-service.ts";

export const anonymousOrderProduct = async (data: {
  paypal_order_id: string;
  products: {
    product_detail_id: number;
    quantity: number;
  }[];
}) => {
  const response = await backendService.post(
    "/api/v1/product-order/anonymous",
    data
  );
  return response.data;
};

export const preOrderProduct = async (data: { paypal_order_id: string }) => {
  const response = await backendService.post(
    "/api/v1/product-order/pre-order",
    data
  );
  return response.data;
};
