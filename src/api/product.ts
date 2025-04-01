import backendService from "@/api/backend-service.ts";
import { ApiResponse, ProductDetail, ProductListed } from "mewmew-api-type";

export const getProductDetailById = async (
  productId?: string
): Promise<ApiResponse<ProductDetail>> => {
  const response = await backendService.get(
    `/api/v1/product/detail/${productId}`,
    {}
  );
  return response.data;
};

export const listProducts = async (
  page: number,
  perPage: number,
  searchByName?: string,
  searchByCategory?: string,
  searchByColor?: string
): Promise<ApiResponse<ProductListed>> => {
  const response = await backendService.get(
    `/api/v1/product?page=${page}&per_page=${perPage}` +
      (searchByName ? `&search=${searchByName}` : "") +
      (searchByCategory ? `&category_ids=${searchByCategory}` : "") +
      (searchByColor ? `&color_ids=${searchByColor}` : "")
  );
  return response.data;
};
