import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Products from "./components/Products";
import PrivateRoutes from "./PathRestriction/PrivateRoutes";
import PublicRoute from "./PathRestriction/PublicRoutes";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<PrivateRoutes />}>
          <Route path="/" element={<Navigate replace to="products" />} />
          <Route path="products" element={<Products />} />
        </Route>

        <Route path="/" element={<PublicRoute />}>
          <Route path="/" element={<Navigate replace to="login" />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
