import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [adminToken, setAdminToken] = useState(
    localStorage.getItem("adminToken") || null
  );

  const login = (token) => {
    localStorage.setItem("adminToken", token);
    setAdminToken(token);
  };

  const logout = () => {
    localStorage.removeItem("adminToken");
    setAdminToken(null);
  };

  return (
    <AuthContext.Provider value={{ adminToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
