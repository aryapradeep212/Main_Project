// PrivateRoute.js
import React from "react";
import { Route, Navigate } from "react-router-dom";

const PrivateRoute = ({ path, element }) => {
  const isAuthenticated = !!localStorage.getItem("token");

  return isAuthenticated ? (
    <Route path={path} element={element} />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;
