import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../ReduxToolkit/Store";

export default function PrivateRoutes() {
  const loggedInState = useSelector((state: RootState) => state.loggedin);
  return loggedInState ? <Outlet /> : <Navigate to="/login" />;
}
