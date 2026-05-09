import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-black text-white p-4 flex justify-between">
      <div className="flex gap-4">
        <Link to="/dashboard">Dashboard</Link>

        <Link to="/attendance">Attendance</Link>

        <Link to="/leaves">Leaves</Link>

        {user?.role === "admin" && <Link to="/employees">Employees</Link>}
      </div>

      <button onClick={logout}>Logout</button>
    </nav>
  );
};

export default Navbar;
