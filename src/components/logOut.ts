import { NavigateFunction } from "react-router-dom";

export const logout = (redirectTo: NavigateFunction) => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("userName");
  localStorage.removeItem("expireRefreshToken");
  localStorage.removeItem("expireAccessToken");
  redirectTo("/login");
};
