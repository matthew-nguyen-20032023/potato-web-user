import backendService from "@/api/backend-service.ts";
import { ApiResponse, EventListed } from "mewmew-api-type";

export const getEvents = async (): Promise<ApiResponse<EventListed>> => {
  const response = await backendService.get("/api/v1/event", {});
  return response.data;
};
