import { useState } from "react";
import axios from "../utils/axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return toast.error("Please enter both email and password");
    }

    try {
      setLoading(true);

      const response = await axios.post("/auth/login", formData);

      login(response.data.token, response.data.user);

      toast.success("Welcome back!");

      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-200 px-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{" "}
            <Link
              to="/register"
              className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
            >
              create a new account
            </Link>
          </p>
        </div>

        {/* Card */}
        <div className="bg-white py-10 px-8 shadow-xl rounded-2xl border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="name@company.com"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all disabled:opacity-70"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* 🔥 DEMO LOGIN BOX */}
          <div className="mt-6 p-4 rounded-lg bg-blue-50 border border-blue-200">
            <p className="text-sm font-semibold text-blue-700 mb-2">
              Demo Admin Login
            </p>

            <div className="text-sm text-gray-700 space-y-1">
              <p>
                <span className="font-medium">Email:</span> admin@gmail.com
              </p>
              <p>
                <span className="font-medium">Password:</span> 123456
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                setFormData({
                  email: "admin@gmail.com",
                  password: "123456",
                })
              }
              className="mt-3 text-xs font-medium text-blue-600 hover:underline"
            >
              Use these credentials
            </button>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-gray-400">
          © 2026 YourApp Inc. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;
