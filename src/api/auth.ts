import backendService from "./backend-service.ts";

export const loginAPI = async (email: string, password: string) => {
  const response = await backendService.post("/api/v1/auth/login", {
    email,
    password,
  });
  return response.data;
};
