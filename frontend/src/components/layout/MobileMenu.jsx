import { X } from "lucide-react";

const MobileMenu = ({ open, setOpen }) => {
  if (!open) return null;

  return (
    <div className="fixed left-4 z-50 w-64 bg-white rounded-xl shadow-xl border">

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <span className="font-semibold text-gray-700 text-sm">
          Menu
        </span>
        <button onClick={() => setOpen(false)}>
          <X size={20} className="text-gray-600" />
        </button>
      </div>

      {/* Links */}
      <nav className="flex flex-col text-sm">
        <a
          href="/"
          onClick={() => setOpen(false)}
          className="px-5 py-3 border-b hover:bg-gray-100"
        >
          Home
        </a>
        <a
          href="#"
          onClick={() => setOpen(false)}
          className="px-5 py-3 border-b hover:bg-gray-100"
        >
          Products
        </a>
        <a
          href="#"
          onClick={() => setOpen(false)}
          className="px-5 py-3 border-b hover:bg-gray-100"
        >
          About Us
        </a>
        <a
          href="#"
          onClick={() => setOpen(false)}
          className="px-5 py-3 hover:bg-gray-100"
        >
          Contact
        </a>
      </nav>
    </div>
  );
};

export default MobileMenu;
