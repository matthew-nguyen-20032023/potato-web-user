import backendService from "@/api/backend-service.ts";

export const getColors = async () => {
  const response = await backendService.get(`/api/v1/color`, {});
  return response.data;
};
