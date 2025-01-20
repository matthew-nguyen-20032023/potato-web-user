import backendService from "./backend-service.ts";

export const getEvents = async () => {
  const response = await backendService.get("/api/v1/event", {});
  return response.data;
};
