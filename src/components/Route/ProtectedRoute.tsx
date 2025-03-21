import * as React from "react";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children, user }) => {
  if (!user) {
    return <Navigate to="/auth/login" />;
  }

  return children;
};
