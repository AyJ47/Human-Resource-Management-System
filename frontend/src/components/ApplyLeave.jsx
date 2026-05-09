import { useState } from "react";

import axios from "axios";

const ApplyLeave = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    reason: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3000/api/leaves/apply", formData);

      alert("Leave applied");

      setFormData({
        startDate: "",
        endDate: "",
        reason: "",
      });

      onSuccess();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6">
      <h2 className="text-xl font-bold mb-4">Apply Leave</h2>

      <input
        type="date"
        name="startDate"
        value={formData.startDate}
        onChange={handleChange}
        className="border p-2 w-full mb-3"
      />

      <input
        type="date"
        name="endDate"
        value={formData.endDate}
        onChange={handleChange}
        className="border p-2 w-full mb-3"
      />

      <textarea
        name="reason"
        placeholder="Reason"
        value={formData.reason}
        onChange={handleChange}
        className="border p-2 w-full mb-3"
      />

      <button type="submit" className="bg-blue-500 text-white px-4 py-2">
        Apply
      </button>
    </form>
  );
};

export default ApplyLeave;
