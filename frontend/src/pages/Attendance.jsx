import { useEffect, useState } from "react";
import axios from "../utils/axios";
import { useAuth } from "../context/AuthContext";
import MarkAttendance from "../components/MarkAttendance";
import AttendanceRecords from "../components/AttendanceRecords";
import toast from "react-hot-toast";

const Attendance = () => {
  const { user } = useAuth();
  const [records, setRecords] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchAttendance = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/attendance");
      setRecords(response.data);
    } catch (error) {
      toast.error("Failed to load records");
    } finally {
      setLoading(false);
    }
  };

  const fetchEmployees = async () => {
    try {
      const res = await axios.get("/employees");
      setEmployees(res.data);

      // For employees, find their own employee ID
      if (user?.role !== "admin") {
        const myRecord = res.data.find(
          (emp) => emp.userId?._id === user.id
        );
        if (myRecord) setEmployeeId(myRecord._id);
      } else if (res.data.length > 0) {
        // For admin, default to first employee
        setSelectedEmployeeId(res.data[0]._id);
      }
    } catch (error) {
      console.error("Employee fetch failed");
    }
  };

  useEffect(() => {
    fetchAttendance();
    fetchEmployees();
  }, []);

  return (
    <div className="p-4 md:p-8 bg-slate-50 min-h-screen">
      <header className="mb-8">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Attendance
        </h1>
        <p className="text-slate-500">Track and manage daily work logs</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Mark Attendance Panel */}
        <div className="lg:col-span-1">
          {user?.role === "admin" ? (
            // Admin: select employee from dropdown, then mark
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <h2 className="text-lg font-bold text-slate-800 mb-1">
                Mark Attendance
              </h2>
              <p className="text-sm text-slate-500 mb-4">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </p>

              <div className="mb-4">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">
                  Select Employee
                </label>
                <select
                  value={selectedEmployeeId}
                  onChange={(e) => setSelectedEmployeeId(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                >
                  <option value="">-- Choose --</option>
                  {employees.map((emp) => (
                    <option key={emp._id} value={emp._id}>
                      {emp.userId?.name} — {emp.department}
                    </option>
                  ))}
                </select>
              </div>

              {selectedEmployeeId && (
                <MarkAttendance
                  employeeId={selectedEmployeeId}
                  onSuccess={fetchAttendance}
                />
              )}
            </div>
          ) : (
            // Employee: mark their own attendance
            employeeId ? (
              <MarkAttendance
                employeeId={employeeId}
                onSuccess={fetchAttendance}
              />
            ) : (
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 text-slate-400 text-center">
                Employee profile not found. Contact your admin.
              </div>
            )
          )}
        </div>

        {/* Records Table */}
        <div className="lg:col-span-2">
          <AttendanceRecords
            records={records}
            isAdmin={user?.role === "admin"}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default Attendance;
