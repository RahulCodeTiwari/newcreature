import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/login";
import Dashboard from "../pages/Dashboard";
import AdminLayout from "../layouts/AdminLayout";
import RequireAuth from "../auth/RequireAuth";
import Categories from "../pages/Categories";
import AdminContacts from "../pages/Contacts";
import AddBlog from "../pages/AddBlog";
import TopProducts from "../pages/TopProducts";
import Products from "../pages/Products";

const AdminRoutes = () => {
  return (
  <Routes>
      {/* Public */}
      <Route path="/" element={<Login />} />
      <Route path="/auth/login" element={<Login />} />

      {/* Protected Admin Routes */}
      <Route element={<RequireAuth />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="categories" element={<Categories />} />
          <Route path="products" element={<Products />} />
          <Route path="home-top-products" element={<TopProducts />} />
          <Route path="contacts" element={<AdminContacts />} />
          <Route path="blogs" element={<AddBlog />} />
        </Route>
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AdminRoutes;
