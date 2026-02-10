

import { Menu, X, Search } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const links = [
    { name: "HOME", path: "/" },
    { name: "OUR PRODUCTS", path: "/categories" },
    { name: "BLOG", path: "/blog" },
    { name: "ABOUT US", path: "/about" },
    { name: "CONTACT US", path: "/contact" },
  ];

  return (
    
    <header className="w-full bg-gradient-to-r from-[#2f5077] to-[#0b2746]">
      <div className="max-w-7xl mx-auto px-4 py-3  flex items-center justify-between">

        {/* LOGO */}
        <div className="flex items-center gap-2">
          <img
            src="/logocreature.png"
            alt="Creature Industry"
            className="h-10 w-auto"
          />
        </div>

        {/* DESKTOP MENU */}
        <nav className="hidden lg:flex items-center gap-6">
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `px-4 py-2 rounded-full text-sm font-semibold transition ${
                  isActive
                    ? "bg-white text-[#0b2746]"
                    : "text-white hover:bg-white/20"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* SEARCH */}
        <div className="lg:flex items-center gap-4 ">
          {/* <div className="relative">
            <input
              type="text"
              placeholder="Search machines..."
              className="h-10 w-50 md:w-100 bg-white rounded-full  pl-4 pr-10 text-sm outline-none"
            />
             
            
          </div> */}

           <SearchBar />

          

        </div>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-white z-50"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* MOBILE MENU */}
        {open && (
          <div className="lg:hidden fixed right-4 top-16 z-50 w-44 bg-white rounded-xl shadow-xl p-2 space-y-2">
            {links.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `block text-center py-2 px-3 rounded-xl text-sm font-semibold transition ${
                    isActive
                      ? "bg-sky-900 text-white"
                      : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
