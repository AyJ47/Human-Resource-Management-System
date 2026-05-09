import axios from "../utils/axios";

const LeaveRequests = ({ leaves, refreshLeaves }) => {
  const updateStatus = async (id, status) => {
    try {
      await axios.patch(`/leaves/${id}/status`, { status });
      toast.success(`Request ${status}`);
      refreshLeaves();
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      pending: "bg-amber-50 text-amber-600 border-amber-100",
      approved: "bg-emerald-50 text-emerald-600 border-emerald-100",
      rejected: "bg-rose-50 text-rose-600 border-rose-100",
    };
    return `px-3 py-1 rounded-full text-xs font-bold border ${
      styles[status] || "bg-slate-50"
    }`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex justify-between items-center">
        <h2 className="font-bold text-slate-800">Pending Approvals</h2>
        <span className="text-xs font-medium text-slate-400">
          {leaves.length} Total Requests
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-400 text-xs uppercase tracking-widest">
            <tr>
              <th className="px-6 py-4">Employee</th>
              <th className="px-6 py-4">Dates</th>
              <th className="px-6 py-4">Reason</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {leaves.map((leave) => (
              <tr
                key={leave._id}
                className="hover:bg-slate-50/50 transition-colors"
              >
                <td className="px-6 py-4 font-semibold text-slate-700">
                  {leave.employeeId?.userId?.name}
                </td>
                <td className="px-6 py-4 text-sm text-slate-600 whitespace-nowrap">
                  {new Date(leave.startDate).toLocaleDateString()} -{" "}
                  {new Date(leave.endDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-sm text-slate-500 max-w-xs truncate">
                  {leave.reason}
                </td>
                <td className="px-6 py-4">
                  <span className={getStatusBadge(leave.status)}>
                    {leave.status.toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => updateStatus(leave._id, "approved")}
                      className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                      title="Approve"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => updateStatus(leave._id, "rejected")}
                      className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      title="Reject"
                    >
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaveRequests;
