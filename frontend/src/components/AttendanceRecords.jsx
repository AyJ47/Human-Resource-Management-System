const AttendanceRecords = ({ records, isAdmin, loading }) => {
  const getStatusStyle = (status) => {
    switch (status) {
      case "present":
        return "bg-emerald-50 text-emerald-600 border-emerald-100";
      case "late":
        return "bg-amber-50 text-amber-600 border-amber-100";
      case "absent":
        return "bg-rose-50 text-rose-600 border-rose-100";
      default:
        return "bg-slate-50 text-slate-600";
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 border-b border-slate-100">
        <h2 className="font-bold text-slate-800">Recent Logs</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 text-slate-400 text-xs uppercase tracking-widest">
              {isAdmin && <th className="px-6 py-4 font-semibold">Employee</th>}
              <th className="px-6 py-4 font-semibold">Date</th>
              <th className="px-6 py-4 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              [...Array(3)].map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td colSpan={3} className="px-6 py-4">
                    <div className="h-4 bg-slate-100 rounded w-full"></div>
                  </td>
                </tr>
              ))
            ) : records.length === 0 ? (
              <tr>
                <td
                  colSpan={3}
                  className="px-6 py-10 text-center text-slate-400"
                >
                  No records found.
                </td>
              </tr>
            ) : (
              records.map((record) => (
                <tr
                  key={record._id}
                  className="hover:bg-slate-50/50 transition-colors"
                >
                  {isAdmin && (
                    <td className="px-6 py-4 font-medium text-slate-700">
                      {record.employeeId?.userId?.name || "Unknown"}
                    </td>
                  )}
                  <td className="px-6 py-4 text-slate-600">
                    {new Date(record.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusStyle(
                        record.status
                      )}`}
                    >
                      {record.status.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceRecords;
