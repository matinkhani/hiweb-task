import React from "react";
import useAuth, { logout } from "../PathRestriction/useAuth/useAuth";
import { useNavigate } from "react-router-dom";

export default function Products() {
  const isLoggedIn = useAuth();
  const navigate = useNavigate();
  return (
    <div>
      <div>Products</div>
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
