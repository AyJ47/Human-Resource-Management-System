const EmployeeList = ({ employees, onEdit, onDelete, isAdmin, loading }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-400 text-xs uppercase tracking-[0.15em]">
              <th className="px-6 py-5 font-semibold">Employee</th>
              <th className="px-6 py-5 font-semibold">Contact Info</th>
              <th className="px-6 py-5 font-semibold">Organization</th>
              <th className="px-6 py-5 font-semibold">Salary</th>
              {isAdmin && (
                <th className="px-6 py-5 text-right font-semibold">Actions</th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {employees.map((emp) => (
              <tr
                key={emp._id}
                className="group hover:bg-slate-50/80 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm border border-blue-200">
                      {emp.userId?.name?.charAt(0) || "E"}
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 leading-none">
                        {emp.userId?.name}
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        ID: {emp._id.slice(-6)}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  <p className="font-medium">{emp.userId?.email}</p>
                  <p className="text-slate-400 text-xs">
                    {emp.phone || "No phone"}
                  </p>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md text-[11px] font-bold uppercase tracking-wider block w-fit mb-1">
                    {emp.department}
                  </span>
                  <p className="text-sm text-slate-500 font-medium">
                    {emp.position}
                  </p>
                </td>
                <td className="px-6 py-4 font-mono text-sm font-semibold text-slate-700">
                  ${emp.salary?.toLocaleString()}
                </td>
                {isAdmin && (
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => onEdit(emp)}
                        className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors font-bold text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onDelete(emp._id)}
                        className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors font-bold text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeList;
