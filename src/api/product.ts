import backendService from "./backend-service.ts";

export const getProductDetailById = async (productId?: string) => {
  const response = await backendService.get(
    `/api/v1/product/detail/${productId}`,
    {}
  );
  return response.data;
};

export const listProducts = async (page: number, perPage: number) => {
  const response = await backendService.get(
    `/api/v1/product?page=${page}&per_page=${perPage}`,
    {}
  );
  return response.data;
};
