import { NavigateFunction } from "react-router-dom";

const useAuth = (): boolean => {
  let accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    return false;
  }
  if (accessToken) {
    return true;
  }

  return false;
};

export const logout = (redirectTo: NavigateFunction) => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("userName");
  localStorage.removeItem("expire_refresh_token");
  localStorage.removeItem("expire_access_token");
  redirectTo("/login");
};

export default useAuth;
