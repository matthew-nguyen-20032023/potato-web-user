import backendService from "@/api/backend-service.ts";
import { ApiResponse, CategoryListed } from "mewmew-api-type";

export const getCategories = async (): Promise<ApiResponse<CategoryListed>> => {
  const response = await backendService.get(`/api/v1/category`, {});
  return response.data;
};
