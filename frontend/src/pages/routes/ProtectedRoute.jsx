import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ allowedRoles }) => {
  const { user, role, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Could be a proper loading spinner component
  }

  if (!user) {
    // Not logged in, redirect to the appropriate login page based on what they tried to access
    if (allowedRoles && allowedRoles.includes('partner')) {
      return <Navigate to="/food-partner/login" replace />;
    }
    return <Navigate to="/user/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    // Logged in but doesn't have the right role
    if (role === 'partner') {
      return <Navigate to="/createFood" replace />;
    }
    // Default fallback for users trying to access partner routes
    return <Navigate to="/" replace />;
  }

  // User has right role and is logged in
  return <Outlet />;
};

export default ProtectedRoute;
