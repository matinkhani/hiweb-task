import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Products from "./components/Products";
import PrivateRoutes from "./PathRestriction/PrivateRoutes";
import PublicRoute from "./PathRestriction/PublicRoutes";
import ProtectedRoutes from "./components/AppContent/ProtectedRoutes";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ProtectedRoutes />}>
          <Route path="/" element={<PrivateRoutes />}>
            <Route path="/" element={<Products />} />
          </Route>
        </Route>
        <Route path="/" element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
