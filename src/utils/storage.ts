export const setAccessToken = (accessToken: string) => {
  localStorage.setItem("access_token", accessToken);
};

export const getAccessToken = () => {
  return localStorage.getItem("access_token");
};

export const removeAccessToken = () => {
  localStorage.removeItem("access_token");
};

export const setRefreshToken = (refreshToken: string) => {
  localStorage.setItem("refresh_token", refreshToken);
};

export const getRefreshToken = () => {
  return localStorage.getItem("refresh_token");
};

export const removeRefreshToken = () => {
  localStorage.removeItem("refresh_token");
};
