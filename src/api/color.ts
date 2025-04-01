import backendService from "@/api/backend-service.ts";
import { ApiResponse, ColorListed } from "mewmew-api-type";

export const getColors = async (): Promise<ApiResponse<ColorListed>> => {
  const response = await backendService.get(`/api/v1/color`, {});
  return response.data;
};
