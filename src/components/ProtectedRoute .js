// components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children, allowedRoles, user }) => {
  const { loading } = useSelector((state) => state.profile);

  // Show a loading indicator while waiting for user data
  if (loading) return <div>Loading...</div>;

  const hasAccess = user && allowedRoles.includes(user.role);

  if (!hasAccess) {
    console.log("Access denied. Redirecting to /login.");
    return <Navigate to="/login" />;
  }

  return children; // Render the protected children
};

export default ProtectedRoute;
