import "./App.css";
import { Routes, Route } from "react-router-dom";
import UserLogin from "./pages/UserLogin";
import UserSignUp from "./pages/UserSignUp";
import AdminLogin from "./pages/AdminLogin";
import AdminSignUp from "./pages/AdminSignUp";
import UpdateUserLogin from "./pages/UpdateUserLogin";
import AdminUpdate from "./components/admin/AdminUpdate.jsx";
import AllProduct from "./components/user/AllProduct";
import AddProduct from "./components/admin/AddProduct";
function App() {
  return (
    <Routes>
      <Route path="/" element={<UserSignUp />} />
      <Route path="/login" element={<UserLogin />} />
      <Route path="login/updateLogin" element={<UpdateUserLogin />} />
      <Route path="/admin/adminUpdate" element={<AdminUpdate />} />
      <Route path="/allProduct" element={<AllProduct />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/signup" element={<AdminSignUp />} />
      <Route path="/admin/product" element={<AddProduct />} />
    </Routes>
  );
}

export default App;
