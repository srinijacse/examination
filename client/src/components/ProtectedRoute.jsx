import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loader from "./Loader";

const ProtectedRoute = ({ children, roles = [] }) => {
  const { user, loading } = useAuth();

  // Show loader while checking authentication
  if (loading) {
    return <Loader />;
  }

  // User not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Check role if roles are provided
  if (roles.length > 0 && !roles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;