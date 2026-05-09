import { useEffect, useState } from "react";

const EmployeeForm = ({ onSubmit, editingEmployee, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    department: "",
    position: "",
    phone: "",
    joinDate: "",
    salary: "",
  });

  useEffect(() => {
    if (editingEmployee) {
      setFormData({
        name: editingEmployee.userId?.name || "",
        email: editingEmployee.userId?.email || "",
        password: "",
        department: editingEmployee.department || "",
        position: editingEmployee.position || "",
        phone: editingEmployee.phone || "",
        joinDate: editingEmployee.joinDate?.split("T")[0] || "",
        salary: editingEmployee.salary || "",
      });
    } else {
      setFormData({
        name: "",
        email: "",
        password: "",
        department: "",
        position: "",
        phone: "",
        joinDate: "",
        salary: "",
      });
    }
  }, [editingEmployee]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (editingEmployee) {
      // Only send employee profile fields when editing (not user account fields)
      const { department, position, phone, joinDate, salary } = formData;
      onSubmit({ department, position, phone, joinDate, salary });
    } else {
      onSubmit(formData);
    }
  };

  const inputClass =
    "w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all placeholder:text-slate-400";
  const labelClass =
    "text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5 block";

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
      <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
        {editingEmployee
          ? "⚡ Edit Member Profile"
          : "➕ Register New Employee"}
      </h2>

      <form
        onSubmit={handleFormSubmit}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {/* User account fields — only shown when creating new */}
        {!editingEmployee && (
          <>
            <div>
              <label className={labelClass}>Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="e.g. John Doe"
                value={formData.name}
                onChange={handleChange}
                className={inputClass}
                required
              />
            </div>
            <div>
              <label className={labelClass}>Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="john@company.com"
                value={formData.email}
                onChange={handleChange}
                className={inputClass}
                required
              />
            </div>
            <div>
              <label className={labelClass}>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Min. 6 characters"
                value={formData.password}
                onChange={handleChange}
                className={inputClass}
                required
                minLength={6}
              />
            </div>
          </>
        )}

        {/* Employee profile fields — always shown */}
        <div>
          <label className={labelClass}>Department</label>
          <input
            type="text"
            name="department"
            placeholder="e.g. Engineering"
            value={formData.department}
            onChange={handleChange}
            className={inputClass}
            required
          />
        </div>
        <div>
          <label className={labelClass}>Job Position</label>
          <input
            type="text"
            name="position"
            placeholder="e.g. Senior Lead"
            value={formData.position}
            onChange={handleChange}
            className={inputClass}
            required
          />
        </div>
        <div>
          <label className={labelClass}>Phone Number</label>
          <input
            type="text"
            name="phone"
            placeholder="+1 (555) 000-0000"
            value={formData.phone}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Joining Date</label>
          <input
            type="date"
            name="joinDate"
            value={formData.joinDate}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Annual Salary ($)</label>
          <input
            type="number"
            name="salary"
            placeholder="80000"
            value={formData.salary}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div className="lg:col-span-3 flex justify-end gap-3 mt-2">
          {editingEmployee && (
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 font-bold text-slate-500 hover:text-slate-700 transition-colors"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="px-10 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl shadow-lg transition-all active:scale-95"
          >
            {editingEmployee ? "Save Changes" : "Create Employee"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
