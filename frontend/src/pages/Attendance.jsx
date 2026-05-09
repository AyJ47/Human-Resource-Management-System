import { useEffect, useState } from "react";
import axios from "../utils/axios";
import { useAuth } from "../context/AuthContext";
import MarkAttendance from "../components/MarkAttendance";
import AttendanceRecords from "../components/AttendanceRecords";
import toast from "react-hot-toast";

const Attendance = () => {
  const { user } = useAuth();
  const [records, setRecords] = useState([]);
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

  const fetchEmployee = async () => {
    try {
      const employees = await axios.get("/employees");
      const employee = employees.data.find(
        (emp) => emp.userId?._id === user.id
      );
      if (employee) setEmployeeId(employee._id);
    } catch (error) {
      console.error("Employee check failed");
    }
  };

  useEffect(() => {
    fetchAttendance();
    fetchEmployee();
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
        {/* Action Sidebar */}
        {/* <div className="lg:col-span-1">
          {employeeId && (
            <MarkAttendance
              employeeId={employeeId}
              onSuccess={fetchAttendance}
            />
          )}
        </div> */}

        {/* Records Table */}
        <div className="lg:col-span-3">
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
