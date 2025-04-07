import backendService from "@/api/backend-service.ts";
import {
  ApiResponse,
  UserLogged,
  UserResetPasswordSuccess,
  UserForgotPasswordSuccess,
} from "mewmew-api-type";
import { UserCreated, UserVerified } from "mewmew-api-type/dist/auth";

export const loginAPI = async (
  email: string,
  password: string
): Promise<ApiResponse<UserLogged>> => {
  const response = await backendService.post("/api/v1/auth/login", {
    email,
    password,
  });
  return response.data;
};

export const forgotPasswordAPI = async (
  email: string
): Promise<ApiResponse<UserForgotPasswordSuccess>> => {
  const response = await backendService.patch("/api/v1/auth/forgot-password", {
    email,
  });
  return response.data;
};

export const resetPasswordAPI = async (
  email: string,
  confirm_code: string,
  new_password: string
): Promise<ApiResponse<UserResetPasswordSuccess>> => {
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
): Promise<ApiResponse<UserCreated>> => {
  const response = await backendService.post("/api/v1/auth/register", {
    email,
    password,
    name,
    phone,
    referral_code: referralCode,
  });
  return response.data;
};

export const verifyEmailAPI = async (
  email: string,
  confirmCode: string
): Promise<ApiResponse<UserVerified>> => {
  const response = await backendService.post("/api/v1/auth/verify-email", {
    email,
    confirm_code: confirmCode,
  });
  return response.data;
};

export const checkVerifyEmailAPI = async (
  email: string
): Promise<ApiResponse<boolean>> => {
  const response = await backendService.get(
    `/api/v1/auth/check-verify-email?email=${email}`
  );
  return response.data;
};
