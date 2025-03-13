import backendService from "@/api/backend-service.ts";

export const getProductDetailById = async (productId?: string) => {
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
) => {
  const response = await backendService.get(
    `/api/v1/product?page=${page}&per_page=${perPage}` +
      (searchByName ? `&search=${searchByName}` : "") +
      (searchByCategory ? `&category_ids=${searchByCategory}` : "") +
      (searchByColor ? `&color_ids=${searchByColor}` : "")
  );
  return response.data;
};
