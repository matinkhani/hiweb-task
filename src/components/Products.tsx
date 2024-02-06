import { useSelector } from "react-redux";
import useAuth, { logout } from "../PathRestriction/useAuth/useAuth";
import { useNavigate } from "react-router-dom";
import { RootState } from "../ReduxToolkit/Store";

export default function Products() {
  const select = useSelector((state: RootState) => state);
  const isLoggedIn = useAuth();
  const navigate = useNavigate();
  return (
    <div>
      <div>Products</div>
      {select.userName}
      {isLoggedIn && (
        <div
          onClick={() => {
            logout(navigate);
          }}
        >
          Logout
        </div>
      )}
    </div>
  );
}
