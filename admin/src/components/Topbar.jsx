import { useNavigate } from "react-router-dom";

const Topbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // later: token remove + api call
    localStorage.removeItem("adminToken");
    navigate("/login");
  };

  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6 shadow-sm">
      {/* Left */}
      <div className="text-lg font-semibold text-gray-700">
        Admin Dashboard
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        {/* Admin Name */}
        <div className="text-sm text-gray-600">
          Hello, <span className="font-medium">Admin</span>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="px-4 py-1.5 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Topbar;
