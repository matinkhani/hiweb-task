import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getLocalTime } from "../../utils/getLocalTime";
import Loading from "../Loading";

export default function ProtectedRoutes() {
  const userName = localStorage.getItem("userName");
  const refreshToken = localStorage.getItem("refreshToken");
  const expireRefreshToken = localStorage.getItem("expireRefreshToken");
  const expireAccessToken = localStorage.getItem("expireAccessToken");
  const [loggedIn, setLoggedIn] = useState<undefined | boolean>();

  const checkLogin = async () => {
    if (refreshToken === null || userName === null) {
      setLoggedIn(false);
    } else {
      const refreshTokenExpireDate = new Date(expireRefreshToken as string);
      const localTime = new Date(getLocalTime());
      if (localTime > refreshTokenExpireDate) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userName");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("expireRefreshToken");
        localStorage.removeItem("expireAccessToken");
        setLoggedIn(false);
      } else {
        const accessTokenExpireDate = new Date(expireAccessToken as string);
        if (accessTokenExpireDate < localTime) {
          try {
            const response = await axios.post(
              "https://taskapi.hiweb.ir/api/Security/UserLogin/RefreshToken",
              {
                userName: userName,
                refreshToken: refreshToken,
              },
              {
                headers: {
                  accept: "text/plain",
                  "Content-Type": "application/json",
                },
              }
            );

            const data = await response.data;
            localStorage.setItem(
              "accessToken",
              data.data.accessToken.access_token
            );
            localStorage.setItem(
              "expireAccessToken",
              data.data.accessToken.expire_access_token
            );
            setLoggedIn(true);
          } catch (error) {
            console.error("Error :", error);
            setLoggedIn(false);
          }
        } else {
          setLoggedIn(true);
        }
      }
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  return loggedIn === true ? (
    <Outlet />
  ) : loggedIn === undefined ? (
    <Loading />
  ) : (
    <Navigate to={"/login"} />
  );
}
