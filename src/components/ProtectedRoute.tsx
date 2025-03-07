import React from "react";
import { Navigate, Outlet } from "react-router";
import { useAuth } from "./AuthContext";

const ProtectedRoute: React.FC = () => {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
