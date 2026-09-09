import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from "../context/AuthContext";

export default function RequireAdmin({ children }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user || user.role !== "admin") {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  return children;
}

RequireAdmin.propTypes = { children: PropTypes.node.isRequired };
