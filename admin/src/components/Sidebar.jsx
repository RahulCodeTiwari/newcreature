import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const linkStyle = ({ isActive }) => ({
    display: "block",
    padding: "10px",
    color: isActive ? "#fff" : "#ccc",
    background: isActive ? "#2563eb" : "transparent",
    textDecoration: "none",
    borderRadius: "4px",
    marginBottom: "6px",
  });

  return (
    <div style={{ width: "220px", height: "100vh", background: "#111", color: "#fff", padding: "12px" }}>
      <h3 style={{ marginBottom: "20px" }}>Admin Panel</h3>

      <nav>
        <NavLink to="/admin/dashboard" style={linkStyle}>
          Dashboard
        </NavLink>

        <NavLink to="/admin/categories" style={linkStyle}>
          Categories
        </NavLink>

        <NavLink to="/admin/products" style={linkStyle}>
          Products
        </NavLink>


        <NavLink to="/admin/home-top-Products" style={linkStyle}>
          homePageTopProducts
        </NavLink>

        <NavLink to="/admin/contacts" style={linkStyle}>
        Contacts</NavLink>

        <NavLink to="/admin/blogs" style={linkStyle}>
        addBlog </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
