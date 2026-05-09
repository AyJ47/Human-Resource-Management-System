const MyLeaves = ({ leaves }) => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-4">My Leaves</h2>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Dates</th>

            <th className="p-2">Reason</th>

            <th className="p-2">Status</th>
          </tr>
        </thead>

        <tbody>
          {leaves.map((leave) => (
            <tr key={leave._id} className="border-t">
              <td className="p-2">
                {new Date(leave.startDate).toLocaleDateString()}
                {" - "}
                {new Date(leave.endDate).toLocaleDateString()}
              </td>

              <td className="p-2">{leave.reason}</td>

              <td className="p-2">
                <span className="px-2 py-1 rounded bg-gray-200 capitalize">
                  {leave.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyLeaves;
