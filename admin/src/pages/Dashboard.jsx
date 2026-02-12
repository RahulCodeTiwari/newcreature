
import { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_API_URL);

const Dashboard = () => {
  const [counts, setCounts] = useState({
    categories: 0,
    products: 0,
    homeTopProducts: 0,
    contacts: 0,
    blogs: 0,
  });

  // ===== INITIAL LOAD =====
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/dashboard/counts`,
          { withCredentials: true }
        );

        if (res.data?.success) {
          setCounts(res.data.data);
        }
      } catch (err) {
        console.error("Dashboard fetch error", err);
      }
    };

    fetchDashboardData();
  }, []);

  // ===== REAL-TIME SOCKET =====
  useEffect(() => {
    socket.on("dashboard:update", (data) => {
      setCounts(data);
    });

    return () => socket.off("dashboard:update");
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Dashboard
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Real-time overview of your admin panel
          </p>
        </div>

        {/* Live badge */}
        <div className="flex items-center gap-2 text-sm text-green-600">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          Live updates
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-10">
        <StatCard title="Categories" value={counts.categories} delay="0" />
        <StatCard title="Products" value={counts.products} delay="100" />
        <StatCard title="Homepage Top" value={counts.homeTopProducts} delay="200" />
        <StatCard title="Contacts" value={counts.contacts} delay="300" />
        <StatCard title="Blogs" value={counts.blogs} delay="400" />
      </div>

      {/* Notes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl shadow-sm p-6 hover:shadow-md transition">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">
            Admin Notes
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Welcome to your admin panel. All dashboard statistics update
            instantly using real-time sockets. Manage categories,
            subcategories, homepage sections, contacts and blogs smoothly
            from the sidebar.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

/* -------------------- */
/* Premium Stat Card    */
/* -------------------- */
const StatCard = ({ title, value, delay }) => {
  return (
    <div
      className="relative overflow-hidden bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
      style={{
        animation: `fadeUp 0.6s ease forwards`,
        animationDelay: `${delay}ms`,
      }}
    >
      {/* Gradient glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 hover:opacity-100 transition" />

      <p className="text-sm text-gray-500 mb-1 relative z-10">
        {title}
      </p>
      <h3 className="text-3xl font-bold text-gray-800 relative z-10">
        {value}
      </h3>
    </div>
  );
};
