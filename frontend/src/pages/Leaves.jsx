import { useEffect, useState } from "react";
import axios from "../utils/axios";
import { useAuth } from "../context/AuthContext";
import ApplyLeave from "../components/ApplyLeave";
import LeaveRequests from "../components/LeaveRequests";
import MyLeaves from "../components/MyLeaves";
import toast from "react-hot-toast";

const Leaves = () => {
  const { user } = useAuth();
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchLeaves = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/leaves");
      setLeaves(response.data);
    } catch (error) {
      toast.error("Failed to fetch leave records");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  return (
    <div className="p-4 md:p-8 bg-slate-50 min-h-screen">
      <header className="mb-8">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Leave Management
        </h1>
        <p className="text-slate-500">Submit and track time-off requests</p>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {user?.role === "employee" && (
          <div className="xl:col-span-1">
            <ApplyLeave onSuccess={fetchLeaves} />
          </div>
        )}

        <div
          className={user?.role === "admin" ? "xl:col-span-4" : "xl:col-span-3"}
        >
          {loading ? (
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 animate-pulse h-64" />
          ) : user?.role === "admin" ? (
            <LeaveRequests leaves={leaves} refreshLeaves={fetchLeaves} />
          ) : (
            <MyLeaves leaves={leaves} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Leaves;
