import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/login";
import Dashboard from "../pages/Dashboard";
import AdminLayout from "../layouts/AdminLayout";
import RequireAuth from "../auth/RequireAuth";
import Categories from "../pages/Categories";


import TopSubCategories from "../pages/TopSubCategories";
import AdminContacts from "../pages/Contacts";
import AddBlog from "../pages/AddBlog";
import Subcategories from "../pages/Subcategories";

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
          <Route path="subcategories" element={<Subcategories />} />
          <Route path="home-top-subcategories" element={<TopSubCategories />} />
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
