import { useEffect, useState } from "react";

import axios from "../utils/axios";

import EmployeeForm from "../components/EmployeeForm";

import EmployeeList from "../components/EmployeeList";

import { useAuth } from "../context/AuthContext";

import toast from "react-hot-toast";

const Employees = () => {
  const { user } = useAuth();

  const [employees, setEmployees] = useState([]);

  const [editingEmployee, setEditingEmployee] = useState(null);

  const [loading, setLoading] = useState(false);

  const fetchEmployees = async () => {
    try {
      setLoading(true);

      const response = await axios.get("/employees");

      setEmployees(response.data);
    } catch (error) {
      toast.error("Failed to fetch employees");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleAddOrUpdate = async (formData) => {
    if (!formData.userId || !formData.department || !formData.position) {
      return toast.error("Please fill all required fields");
    }

    try {
      setLoading(true);

      if (editingEmployee) {
        await axios.put(`/employees/${editingEmployee._id}`, formData);

        toast.success("Employee updated");

        setEditingEmployee(null);
      } else {
        await axios.post("/employees", formData);

        toast.success("Employee added");
      }

      fetchEmployees();
    } catch (error) {
      toast.error(error.response?.data?.message || "Operation failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);

      await axios.delete(`/employees/${id}`);

      toast.success("Employee deleted");

      fetchEmployees();
    } catch (error) {
      toast.error("Delete failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Employees</h1>

      {loading && <p className="mb-4">Loading...</p>}

      {user?.role === "admin" && (
        <EmployeeForm
          onSubmit={handleAddOrUpdate}
          editingEmployee={editingEmployee}
        />
      )}

      <EmployeeList
        employees={employees}
        onEdit={setEditingEmployee}
        onDelete={handleDelete}
        isAdmin={user?.role === "admin"}
      />
    </div>
  );
};

export default Employees;
