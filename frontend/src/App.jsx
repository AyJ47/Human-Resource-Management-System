import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";

import PrivateRoute from "./components/PrivateRoute";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Attendance from "./pages/Attendance";
import Leaves from "./pages/Leaves";

import { useAuth } from "./context/AuthContext";

function App() {
  const { token } = useAuth();

  return (
    <BrowserRouter>
      {token && <Sidebar />}

      {/* 
         1. md:ml-64 handles the sidebar offset
         2. min-h-screen ensures the background covers the whole height
         3. transition-all makes the shift smooth if the sidebar toggles
      */}
      <div
        className={`${
          token ? "md:ml-64" : ""
        } min-h-screen bg-slate-50 transition-all duration-300`}
      >
        {/* 
           This inner wrapper centers the content:
           - max-w-7xl: Prevents the dashboard from becoming too wide on huge screens
           - mx-auto: Centers the container
        */}
        <div className="max-w-7xl mx-auto">
          <Routes>
            <Route path="/login" element={<Login />} />

            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />

            <Route
              path="/employees"
              element={
                <PrivateRoute>
                  <Employees />
                </PrivateRoute>
              }
            />

            <Route
              path="/attendance"
              element={
                <PrivateRoute>
                  <Attendance />
                </PrivateRoute>
              }
            />

            <Route
              path="/leaves"
              element={
                <PrivateRoute>
                  <Leaves />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
