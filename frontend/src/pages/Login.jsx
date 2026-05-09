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
        {/* Header Section */}
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
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400"
                onChange={handleChange}
              />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <label className="text-sm font-semibold text-gray-700">
                  Password
                </label>
                <a href="#" className="text-xs text-blue-600 hover:underline">
                  Forgot password?
                </a>
              </div>
              <input
                type="password"
                name="password"
                required
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400"
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all ${
                loading
                  ? "opacity-70 cursor-not-allowed"
                  : "active:scale-[0.98]"
              }`}
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Social Divider */}
          <div className="mt-8 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500 italic">
                Secure Login
              </span>
            </div>
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
