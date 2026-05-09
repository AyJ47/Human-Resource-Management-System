const MarkAttendance = ({ employeeId, onSuccess }) => {
  const [status, setStatus] = useState("present");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axios.post("/attendance/mark", { employeeId, status });
      toast.success("Attendance logged successfully");
      onSuccess();
    } catch (error) {
      toast.error(error.response?.data?.message || "Already marked for today");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200"
    >
      <h2 className="text-lg font-bold text-slate-800 mb-1">Check In</h2>
      <p className="text-sm text-slate-500 mb-6">
        {new Date().toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
        })}
      </p>

      <div className="space-y-4">
        <div>
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">
            Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none"
          >
            <option value="present">✅ Present</option>
            <option value="absent">❌ Absent</option>
            <option value="late">⏰ Late</option>
          </select>
        </div>

        <button
          disabled={submitting}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-95 disabled:opacity-50"
        >
          {submitting ? "Processing..." : "Confirm Attendance"}
        </button>
      </div>
    </form>
  );
};

export default MarkAttendance;
