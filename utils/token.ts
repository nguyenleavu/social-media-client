export const setAccessToken = (access_token: string) => {
  localStorage.setItem("access_token", access_token);
};

export const setRefreshToken = (access_token: string) => {
  localStorage.setItem("refresh_token", access_token);
};

export const clearAccessToken = () => {
  localStorage.removeItem("access_token");
};

export const clearRefreshToken = () => {
  localStorage.removeItem("refresh_token");
};

export const getAccessToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("access_token") || "";
  }
  return "";
};

export const clearLocalStorage = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
};

export const getRefreshToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("refresh_token") || "";
  }
  return "";
};
