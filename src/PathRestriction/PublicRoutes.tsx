import useAuth from "./useAuth/useAuth";
import { Navigate, Outlet } from "react-router-dom";

export default function PublicRoute() {
  const isLoggedIn = useAuth();
  return isLoggedIn ? <Navigate to="/products" /> : <Outlet />;
}
