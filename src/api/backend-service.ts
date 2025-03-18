import axios from "axios";
import {
  setAccessToken,
  getAccessToken,
  getRefreshToken,
  removeRefreshToken,
  removeAccessToken,
} from "@/utils/storage.ts";
import { baseProductOrderURL } from "@/api/product-order.ts";

const backendService = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const refreshTokenAPI = async () => {
  const response = await backendService.post("/api/v1/auth/refresh-token", {
    refresh_token: getRefreshToken(),
  });
  return response.data;
};

backendService.interceptors.request.use(
  async (config) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

backendService.interceptors.response.use(
  (response) => response,
  async function (error) {
    const originalRequest = error.config;

    // Ensure error.response exists before accessing status
    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const resp = await refreshTokenAPI();
        const access_token = resp.data.access_token;

        setAccessToken(access_token);

        // Update the request header for retry
        originalRequest.headers["Authorization"] = `Bearer ${access_token}`;

        return backendService(originalRequest); // Retry request with new token
      } catch (refreshError) {
        removeRefreshToken();
        removeAccessToken();
        if (!error.request.responseURL.includes(baseProductOrderURL)) {
          window.location.href = "/login";
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default backendService;
