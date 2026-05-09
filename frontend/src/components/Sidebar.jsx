import { Link, useLocation } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaThLarge,
  FaCalendarCheck,
  FaFileAlt,
  FaUsers,
  FaSignOutAlt,
} from "react-icons/fa";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const links = [
    { name: "Dashboard", path: "/dashboard", icon: <FaThLarge /> },
    { name: "Attendance", path: "/attendance", icon: <FaCalendarCheck /> },
    { name: "Leaves", path: "/leaves", icon: <FaFileAlt /> },
  ];

  if (user?.role === "admin") {
    links.push({ name: "Employees", path: "/employees", icon: <FaUsers /> });
  }

  return (
    <>
      {/* MOBILE HEADER/TOGGLE */}
      <div className="md:hidden fixed top-0 left-0 w-full bg-slate-900 text-white p-4 flex justify-between items-center z-50">
        <h1 className="text-xl font-black tracking-tighter">HRMS</h1>
        <button
          onClick={() => setOpen(!open)}
          className="text-white p-2 hover:bg-slate-800 rounded-lg transition-colors"
        >
          {open ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* SIDEBAR */}
      <aside
        className={`fixed top-0 left-0 h-full bg-slate-900 text-slate-300 w-64 flex flex-col transition-transform duration-300 z-40 shadow-2xl
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 border-r border-slate-800`}
      >
        {/* LOGO AREA */}
        <div className="p-8">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
              H
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              HRMS
            </h1>
          </div>
        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 px-4 space-y-2">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-4 mb-4">
            Main Menu
          </p>
          {links.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all group
                  ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20"
                      : "hover:bg-slate-800 hover:text-white"
                  }`}
                onClick={() => setOpen(false)}
              >
                <span
                  className={`${
                    isActive
                      ? "text-white"
                      : "text-slate-500 group-hover:text-blue-400"
                  }`}
                >
                  {link.icon}
                </span>
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* USER PROFILE & LOGOUT */}
        <div className="p-4 mt-auto border-t border-slate-800 bg-slate-900/50">
          <div className="flex items-center gap-3 px-2 mb-4">
            <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold shadow-inner">
              {user?.name?.charAt(0) || "U"}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-white truncate">
                {user?.name || "User Name"}
              </p>
              <p className="text-xs text-slate-500 capitalize">
                {user?.role || "Member"}
              </p>
            </div>
          </div>

          <button
            onClick={logout}
            className="flex items-center justify-center gap-2 w-full bg-slate-800 hover:bg-rose-600/10 hover:text-rose-500 text-slate-300 py-2.5 rounded-xl font-semibold transition-all border border-slate-700 hover:border-rose-500/50"
          >
            <FaSignOutAlt size={14} />
            Logout
          </button>
        </div>
      </aside>

      {/* OVERLAY FOR MOBILE */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
