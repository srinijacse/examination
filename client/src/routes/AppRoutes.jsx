import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "../components/ProtectedRoute";

// Pages
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Exams from "../pages/Exams";
import AddExam from "../pages/AddExam";
import Students from "../pages/Students";
import Marks from "../pages/Marks";
import HallTickets from "../pages/HallTickets";
import Profile from "../pages/Profile";
import ActivityLogs from "../pages/ActivityLogs";
import NotFound from "../pages/NotFound";
import Subjects from "../pages/Subjects";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Default Route */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/exams"
          element={
            <ProtectedRoute>
              <Exams />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-exam"
          element={
            <ProtectedRoute roles={["admin"]}>
              <AddExam />
            </ProtectedRoute>
          }
        />

        <Route
          path="/students"
          element={
            <ProtectedRoute roles={["admin"]}>
              <Students />
            </ProtectedRoute>
          }
        />

        <Route
          path="/marks"
          element={
            <ProtectedRoute roles={["admin", "faculty"]}>
              <Marks />
            </ProtectedRoute>
          }
        />

        <Route
          path="/halltickets"
          element={
            <ProtectedRoute>
              <HallTickets />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/activitylogs"
          element={
            <ProtectedRoute roles={["admin"]}>
              <ActivityLogs />
            </ProtectedRoute>
          }
        />
        <Route
    path="/subjects"
    element={
        <ProtectedRoute roles={["admin"]}>
            <Subjects />
        </ProtectedRoute>
    }
/>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;