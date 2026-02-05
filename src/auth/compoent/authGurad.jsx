import { Navigate } from "react-router";
import { useAuth } from "../context/authProvider";

const AuthGuard = ({ children, role }) => {
  const { isAuthenticated, role: userRole } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (role && role !== userRole) {
    return <Navigate to="/" />;
  }

  return children;
};

export default AuthGuard;
