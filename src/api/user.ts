import backendService from "@/api/backend-service.ts";
import { getAccessToken } from "@/utils/storage.ts";
import { ApiResponse, UserProfile } from "mewmew-api-type";

export const getProfileAPI = async (): Promise<ApiResponse<UserProfile>> => {
  const response = await backendService.get("/api/v1/user/profile", {
    headers: { Authorization: `Bearer ${getAccessToken()}` },
  });
  return response.data;
};
