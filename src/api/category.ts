import backendService from "./backend-service.ts";

export const getCategories = async () => {
  const response = await backendService.get(`/api/v1/category`, {});
  return response.data;
};
