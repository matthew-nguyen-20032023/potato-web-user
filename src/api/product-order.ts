import backendService from "@/api/backend-service.ts";
import { getAccessToken } from "@/utils/storage.ts";
import { IGetOrderDetail } from "@/types.ts";

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

export const getAnonymousOrderProduct = async (
  paypal_order_id: string
): Promise<{
  message: string;
  data: IGetOrderDetail[];
  statusCode: number;
  metadata: { total: number };
}> => {
  const response = await backendService.get(
    `/api/v1/product-order/${paypal_order_id}`
  );
  return response.data;
};

export const getOrderHistory = async (
  paypal_order_id: string,
  page = 1,
  per_page = 10
): Promise<{
  message: string;
  data: IGetOrderDetail[];
  statusCode: number;
  metadata: { total: number };
}> => {
  const accessToken = getAccessToken();
  if (!accessToken) {
    return await getAnonymousOrderProduct(paypal_order_id);
  } else {
    return await getUserOrderProduct(
      paypal_order_id,
      accessToken,
      page,
      per_page
    );
  }
};

export const getUserOrderProduct = async (
  paypal_order_id: string,
  accessToken: string,
  page: number,
  per_page: number
): Promise<{
  message: string;
  data: IGetOrderDetail[];
  statusCode: number;
  metadata: { total: number };
}> => {
  let url = `/api/v1/product-order?page=${page}&per_page=${per_page}`;
  if (paypal_order_id) url += `&paypal_order_id=${paypal_order_id}`;
  const response = await backendService.get(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
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
