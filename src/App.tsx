import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Products from "./components/Products";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
