import { useEffect, useState } from "react";

const EmployeeForm = ({ onSubmit, editingEmployee }) => {
  const [formData, setFormData] = useState({
    userId: "",
    department: "",
    position: "",
    phone: "",
    joinDate: "",
    salary: "",
  });

  useEffect(() => {
    if (editingEmployee) {
      setFormData({
        userId: editingEmployee.userId?._id || "",

        department: editingEmployee.department || "",

        position: editingEmployee.position || "",

        phone: editingEmployee.phone || "",

        joinDate: editingEmployee.joinDate?.split("T")[0] || "",

        salary: editingEmployee.salary || "",
      });
    }
  }, [editingEmployee]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(formData);

    if (!editingEmployee) {
      setFormData({
        userId: "",
        department: "",
        position: "",
        phone: "",
        joinDate: "",
        salary: "",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6">
      <h2 className="text-xl font-bold mb-4">
        {editingEmployee ? "Edit Employee" : "Add Employee"}
      </h2>

      <input
        type="text"
        name="userId"
        placeholder="User ID"
        value={formData.userId}
        onChange={handleChange}
        className="border p-2 w-full mb-3"
      />

      <input
        type="text"
        name="department"
        placeholder="Department"
        value={formData.department}
        onChange={handleChange}
        className="border p-2 w-full mb-3"
      />

      <input
        type="text"
        name="position"
        placeholder="Position"
        value={formData.position}
        onChange={handleChange}
        className="border p-2 w-full mb-3"
      />

      <input
        type="text"
        name="phone"
        placeholder="Phone"
        value={formData.phone}
        onChange={handleChange}
        className="border p-2 w-full mb-3"
      />

      <input
        type="date"
        name="joinDate"
        value={formData.joinDate}
        onChange={handleChange}
        className="border p-2 w-full mb-3"
      />

      <input
        type="number"
        name="salary"
        placeholder="Salary"
        value={formData.salary}
        onChange={handleChange}
        className="border p-2 w-full mb-3"
      />

      <button type="submit" className="bg-blue-500 text-white px-4 py-2">
        {editingEmployee ? "Update" : "Add"}
      </button>
    </form>
  );
};

export default EmployeeForm;
