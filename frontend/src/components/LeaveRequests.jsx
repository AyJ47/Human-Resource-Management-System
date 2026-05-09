import axios from "axios";

const LeaveRequests = ({ leaves, refreshLeaves }) => {
  const updateStatus = async (id, status) => {
    try {
      await axios.patch(`http://localhost:3000/api/leaves/${id}/status`, {
        status,
      });

      refreshLeaves();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Leave Requests</h2>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Employee</th>

            <th className="p-2">Dates</th>

            <th className="p-2">Reason</th>

            <th className="p-2">Status</th>

            <th className="p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {leaves.map((leave) => (
            <tr key={leave._id} className="border-t">
              <td className="p-2">{leave.employeeId?.userId?.name}</td>

              <td className="p-2">
                {new Date(leave.startDate).toLocaleDateString()}
                {" - "}
                {new Date(leave.endDate).toLocaleDateString()}
              </td>

              <td className="p-2">{leave.reason}</td>

              <td className="p-2 capitalize">{leave.status}</td>

              <td className="p-2 flex gap-2">
                <button
                  onClick={() => updateStatus(leave._id, "approved")}
                  className="bg-green-500 text-white px-2 py-1"
                >
                  Approve
                </button>

                <button
                  onClick={() => updateStatus(leave._id, "rejected")}
                  className="bg-red-500 text-white px-2 py-1"
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaveRequests;
