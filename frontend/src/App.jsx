import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar"

import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyApplications from "./pages/MyApplications";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import MyJobs from "./pages/MyJobs";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>

     
     <Navbar />

      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Shared Protected Route (both roles can access jobs) */}
        <Route
          path="/jobs"
          element={
            <ProtectedRoute allowedRoles={["seeker", "recruiter"]}>
              <Jobs />
            </ProtectedRoute>
          }
        />

        <Route
          path="/jobs/:id"
          element={
            <ProtectedRoute allowedRoles={["seeker", "recruiter"]}>
              <JobDetails />
            </ProtectedRoute>
          }
        />

        {/* Seeker Only */}
        <Route
          path="/applications"
          element={
            <ProtectedRoute allowedRoles={["seeker"]}>
              <MyApplications />
            </ProtectedRoute>
          }
        />

        {/* Recruiter Only */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["recruiter"]}>
              <RecruiterDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-jobs"
          element={
            <ProtectedRoute allowedRoles={["recruiter"]}>
              <MyJobs />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;