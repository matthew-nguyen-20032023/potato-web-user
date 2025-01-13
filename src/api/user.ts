import backendService from "./backend-service.ts";
import { getAccessToken } from "../utils/storage.ts";

export const getProfileAPI = async () => {
  const response = await backendService.get("/api/v1/user/profile", {
    headers: { Authorization: `Bearer ${getAccessToken()}` },
  });
  return response.data;
};
