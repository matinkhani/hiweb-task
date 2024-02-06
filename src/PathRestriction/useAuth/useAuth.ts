import { jwtDecode } from "jwt-decode";
import { NavigateFunction } from "react-router-dom";

const useAuth = (): boolean => {
  let accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    return false;
  }
  if (accessToken) {
    const decoded = jwtDecode(accessToken);
    if (decoded) {
      return true;
    }
  }

  return false;
};

export const logout = (redirectTo: NavigateFunction) => {
  localStorage.removeItem("accessToken");
  redirectTo("/login");
};

export default useAuth;
