import { useState } from "react";

import axios from "axios";

const MarkAttendance = ({ employeeId, onSuccess }) => {
  const [status, setStatus] = useState("present");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3000/api/attendance/mark", {
        employeeId,
        status,
      });

      alert("Attendance marked");

      onSuccess();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6">
      <h2 className="text-xl font-bold mb-4">Mark Attendance</h2>

      <p className="mb-4">Today: {new Date().toLocaleDateString()}</p>

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border p-2 w-full mb-4"
      >
        <option value="present">Present</option>

        <option value="absent">Absent</option>

        <option value="late">Late</option>
      </select>

      <button type="submit" className="bg-blue-500 text-white px-4 py-2">
        Submit
      </button>
    </form>
  );
};

export default MarkAttendance;
