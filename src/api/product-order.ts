import backendService from "./backend-service.ts";
import { getAccessToken } from "../utils/storage.ts";

export const orderProduct = async (data: {
  paypal_order_id: string;
  products: {
    product_detail_id: number;
    quantity: number;
  }[];
}) => {
  const accessToken = getAccessToken();
  if (accessToken) {
    return await authorizedOrderProduct(data, accessToken);
  } else {
    return await anonymousOrderProduct(data);
  }
};

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

export const authorizedOrderProduct = async (
  data: {
    paypal_order_id: string;
    products: {
      product_detail_id: number;
      quantity: number;
    }[];
  },
  accessToken: string
) => {
  const response = await backendService.post("/api/v1/product-order", data, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response.data;
};

export const preOrderProduct = async (data: {
  paypal_order_id: string;
  products: {
    product_detail_id: number;
    quantity: number;
  }[];
}) => {
  const response = await backendService.post(
    "/api/v1/product-order/pre-order",
    data
  );
  return response.data;
};
