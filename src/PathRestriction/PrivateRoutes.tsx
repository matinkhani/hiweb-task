import useAuth from "./useAuth/useAuth";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoutes() {
  const isLoggedIn = useAuth();
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
}
