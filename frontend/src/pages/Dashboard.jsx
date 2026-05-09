import { useEffect, useState } from "react";

import axios from "axios";

import { useAuth } from "../context/AuthContext";

import StatCard from "../components/StatCard";

const Dashboard = () => {
  const { user } = useAuth();

  const [stats, setStats] = useState({
    employees: 0,
    attendance: 0,
    pendingLeaves: 0,
    totalLeaves: 0,
  });

  const fetchStats = async () => {
    try {
      // EMPLOYEES
      const employeesRes = await axios.get(
        "http://localhost:3000/api/employees"
      );

      // TODAY ATTENDANCE
      const attendanceRes = await axios.get(
        "http://localhost:3000/api/attendance?date=today"
      );

      // PENDING LEAVES
      const pendingLeavesRes = await axios.get(
        "http://localhost:3000/api/leaves?status=pending"
      );

      // ALL LEAVES
      const leavesRes = await axios.get("http://localhost:3000/api/leaves");

      setStats({
        employees: employeesRes.data.length,

        attendance: attendanceRes.data.length,

        pendingLeaves: pendingLeavesRes.data.length,

        totalLeaves: leavesRes.data.length,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {user?.role === "admin" ? (
          <>
            <StatCard title="Total Employees" value={stats.employees} />

            <StatCard title="Today's Attendance" value={stats.attendance} />

            <StatCard title="Pending Leaves" value={stats.pendingLeaves} />
          </>
        ) : (
          <>
            <StatCard title="My Attendance Records" value={stats.attendance} />

            <StatCard title="My Leaves" value={stats.totalLeaves} />

            <StatCard title="Pending Leaves" value={stats.pendingLeaves} />
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
