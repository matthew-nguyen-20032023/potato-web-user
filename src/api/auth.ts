import backendService from "./backend-service.ts";

export const loginAPI = async (email: string, password: string) => {
  const response = await backendService.post("/api/v1/auth/login", {
    email,
    password,
  });
  return response.data;
};

export const registerAPI = async (
  email: string,
  password: string,
  name: string,
  phone: string,
  referralCode: string
) => {
  const response = await backendService.post("/api/v1/auth/register", {
    email,
    password,
    name,
    phone,
    referral_code: referralCode,
  });
  return response.data;
};

export const verifyEmailAPI = async (email: string, confirmCode: string) => {
  const response = await backendService.post("/api/v1/auth/verify-email", {
    email,
    confirm_code: confirmCode,
  });
  return response.data;
};
