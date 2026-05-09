const AttendanceRecords = ({ records, isAdmin }) => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            {isAdmin && <th className="p-2">Employee</th>}

            <th className="p-2">Date</th>

            <th className="p-2">Status</th>
          </tr>
        </thead>

        <tbody>
          {records.map((record) => (
            <tr key={record._id} className="border-t">
              {isAdmin && (
                <td className="p-2">{record.employeeId?.userId?.name}</td>
              )}

              <td className="p-2">
                {new Date(record.date).toLocaleDateString()}
              </td>

              <td className="p-2 capitalize">{record.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceRecords;
