import { useEffect, useState } from "react";
import axios from "../utils/axios";
import { useAuth } from "../context/AuthContext";
import StatCard from "../components/StatCard";
import toast from "react-hot-toast";
// Note: You can use Lucide-react or Heroicons for these
import { Users, CalendarCheck, FileClock, ClipboardList } from "lucide-react";

const Dashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    employees: 0,
    attendance: 0,
    pendingLeaves: 0,
    totalLeaves: 0,
  });

  const fetchStats = async () => {
    try {
      setLoading(true);
      // Fetch all data in parallel for better performance
      const [empRes, attRes, pendingRes, allLeavesRes] = await Promise.all([
        axios.get("/employees"),
        axios.get("/attendance?date=today"),
        axios.get("/leaves?status=pending"),
        axios.get("/leaves"),
      ]);

      setStats({
        employees: empRes.data.length,
        attendance: attRes.data.length,
        pendingLeaves: pendingRes.data.length,
        totalLeaves: allLeavesRes.data.length,
      });
    } catch (error) {
      toast.error("Systems check failed. Please refresh.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  // Helper for Greeting
  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Morning";
    if (hour < 17) return "Afternoon";
    return "Evening";
  };

  return (
    <div className="p-4 md:p-8 min-h-screen bg-[#f8fafc]">
      {/* Header Section */}
      <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Good {getTimeOfDay()}, {user?.name?.split(" ")[0] || "User"}
          </h1>
          <p className="text-slate-500 mt-1 font-medium">
            Here's what's happening with your team today.
          </p>
        </div>

        <button
          onClick={fetchStats}
          className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
        >
          Refresh Data
        </button>
      </div>

      {loading ? (
        /* Modern Skeleton Loader Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-32 w-full bg-white animate-pulse rounded-2xl border border-slate-100"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {user?.role === "admin" ? (
            <>
              <StatCard
                title="Total Employees"
                value={stats.employees}
                icon={<Users size={24} />}
                color="bg-indigo-500"
              />
              <StatCard
                title="Today's Attendance"
                value={stats.attendance}
                icon={<CalendarCheck size={24} />}
                color="bg-emerald-500"
              />
              <StatCard
                title="Pending Leaves"
                value={stats.pendingLeaves}
                icon={<FileClock size={24} />}
                color="bg-amber-500"
              />
              <StatCard
                title="System Logs"
                value={stats.totalLeaves}
                icon={<ClipboardList size={24} />}
                color="bg-slate-500"
              />
            </>
          ) : (
            <>
              <StatCard
                title="Attendance Streak"
                value={stats.attendance}
                icon={<CalendarCheck size={24} />}
                color="bg-emerald-500"
              />
              <StatCard
                title="My Leave Requests"
                value={stats.totalLeaves}
                icon={<ClipboardList size={24} />}
                color="bg-indigo-500"
              />
              <StatCard
                title="Leaves Pending"
                value={stats.pendingLeaves}
                icon={<FileClock size={24} />}
                color="bg-amber-500"
              />
            </>
          )}
        </div>
      )}

      {/* Modern Dashboard Layouts usually include a "Quick Actions" or "Recent Activity" section below the cards */}
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm h-64 flex items-center justify-center text-slate-400 border-dashed border-2">
          Chart Placeholder (e.g., Weekly Attendance)
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm h-64 flex items-center justify-center text-slate-400 border-dashed border-2">
          Recent Notifications
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
