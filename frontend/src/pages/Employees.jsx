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
      toast.error("Failed to sync employee directory");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleAddOrUpdate = async (formData) => {
    try {
      setLoading(true);
      if (editingEmployee) {
        await axios.put(`/employees/${editingEmployee._id}`, formData);
        toast.success("Profile updated successfully");
        setEditingEmployee(null);
      } else {
        await axios.post("/employees", formData);
        toast.success("New employee onboarded");
      }
      fetchEmployees();
    } catch (error) {
      toast.error(error.response?.data?.message || "Action failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure? This action cannot be undone.")) return;
    try {
      setLoading(true);
      await axios.delete(`/employees/${id}`);
      toast.success("Employee removed");
      fetchEmployees();
    } catch (error) {
      toast.error("Delete operation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-8 bg-slate-50 min-h-screen">
      <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Employee Directory
          </h1>
          <p className="text-slate-500 font-medium">
            Manage team members and their roles
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm font-bold text-slate-400 bg-white px-4 py-2 rounded-lg border border-slate-200">
          <span className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse"></span>
          {employees.length} Active Members
        </div>
      </header>

      <div className="space-y-8">
        {user?.role === "admin" && (
          <EmployeeForm
            onSubmit={handleAddOrUpdate}
            editingEmployee={editingEmployee}
            onCancel={() => setEditingEmployee(null)}
          />
        )}

        <EmployeeList
          employees={employees}
          onEdit={setEditingEmployee}
          onDelete={handleDelete}
          isAdmin={user?.role === "admin"}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default Employees;
