import { useState } from "react";
import axios from "../utils/axios";
import toast from "react-hot-toast";

const ApplyLeave = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    reason: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("/leaves/apply", formData);
      toast.success("Application submitted successfully");
      setFormData({ startDate: "", endDate: "", reason: "" });
      onSuccess();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error submitting application");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full bg-slate-50 border border-slate-200 rounded-xl p-3 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all";

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 sticky top-8"
    >
      <h2 className="text-lg font-bold text-slate-800 mb-6">New Request</h2>

      <div className="space-y-4">
        <div>
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 block">
            Start Date
          </label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={(e) =>
              setFormData({ ...formData, startDate: e.target.value })
            }
            className={inputClass}
            required
          />
        </div>

        <div>
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 block">
            End Date
          </label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={(e) =>
              setFormData({ ...formData, endDate: e.target.value })
            }
            className={inputClass}
            required
          />
        </div>

        <div>
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 block">
            Reason
          </label>
          <textarea
            name="reason"
            placeholder="Briefly describe your reason..."
            rows="3"
            value={formData.reason}
            onChange={(e) =>
              setFormData({ ...formData, reason: e.target.value })
            }
            className={inputClass}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-95 disabled:opacity-50"
        >
          {loading ? "Sending..." : "Submit Application"}
        </button>
      </div>
    </form>
  );
};

export default ApplyLeave;
