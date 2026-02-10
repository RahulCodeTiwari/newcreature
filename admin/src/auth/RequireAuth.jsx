import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./authContext";

const RequireAuth = () => {
  const { adminToken } = useContext(AuthContext); // useContext se token access karo

  // Optional: loading state agar chahiye to add karo
  // if (loading) return <p>Loading...</p>;

  // Agar token nahi hai, redirect to login
  if (!adminToken) {
    return <Navigate to="/login" replace />;
  }

  // Agar token hai, protected component render karo
  return <Outlet />;
};

export default RequireAuth;
