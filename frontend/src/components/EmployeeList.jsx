const EmployeeList = ({ employees, onEdit, onDelete, isAdmin }) => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Name</th>

            <th className="p-2">Email</th>

            <th className="p-2">Department</th>

            <th className="p-2">Position</th>

            {isAdmin && <th className="p-2">Actions</th>}
          </tr>
        </thead>

        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id} className="border-t">
              <td className="p-2">{employee.userId?.name}</td>

              <td className="p-2">{employee.userId?.email}</td>

              <td className="p-2">{employee.department}</td>

              <td className="p-2">{employee.position}</td>

              {isAdmin && (
                <td className="p-2 flex gap-2">
                  <button
                    onClick={() => onEdit(employee)}
                    className="bg-yellow-500 text-white px-2 py-1"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => onDelete(employee._id)}
                    className="bg-red-500 text-white px-2 py-1"
                  >
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
