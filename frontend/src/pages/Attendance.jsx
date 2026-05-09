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
      toast.error("Failed to fetch attendance");
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

      if (employee) {
        setEmployeeId(employee._id);
      }
    } catch (error) {
      toast.error("Failed to fetch employee");
    }
  };

  useEffect(() => {
    fetchAttendance();
    fetchEmployee();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Attendance</h1>

      {loading && <p className="mb-4">Loading...</p>}

      {employeeId && (
        <MarkAttendance employeeId={employeeId} onSuccess={fetchAttendance} />
      )}

      <AttendanceRecords records={records} isAdmin={user?.role === "admin"} />
    </div>
  );
};

export default Attendance;
