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
      toast.error("Failed to fetch leaves");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Leaves</h1>

      {loading && <p className="mb-4">Loading...</p>}

      {user?.role === "employee" && <ApplyLeave onSuccess={fetchLeaves} />}

      {user?.role === "admin" ? (
        <LeaveRequests leaves={leaves} refreshLeaves={fetchLeaves} />
      ) : (
        <MyLeaves leaves={leaves} />
      )}
    </div>
  );
};

export default Leaves;
