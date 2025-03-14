import backendService from "@/api/backend-service.ts";

export const loginAPI = async (email: string, password: string) => {
  const response = await backendService.post("/api/v1/auth/login", {
    email,
    password,
  });
  return response.data;
};

export const refreshTokenAPI = async (refresh_token: string) => {
  const response = await backendService.post("/api/v1/auth/refresh-token", {
    refresh_token,
  });
  return response.data;
};

export const forgotPasswordAPI = async (email: string) => {
  const response = await backendService.patch("/api/v1/auth/forgot-password", {
    email,
  });
  return response.data;
};

export const resetPasswordAPI = async (
  email: string,
  confirm_code: string,
  new_password: string
) => {
  const response = await backendService.patch("/api/v1/auth/reset-password", {
    email,
    confirm_code,
    new_password,
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
