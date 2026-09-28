import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ROUTES } from './routes';

/**
 * ProtectedRoute Component
 * Enforces client-side navigation security and checks for JWT token presence and admin role.
 * Note: The Django REST backend independently enforces JWT signature, expiration, and permission.
 */
const ProtectedRoute = ({ children, requireAdmin = false, redirectTo = null }) => {
  const { isUserLoggedIn, isAdminLoggedIn, currentUser } = useAuth();
  const location = useLocation();

  if (requireAdmin) {
    if (!isAdminLoggedIn) {
      return <Navigate to={redirectTo || ROUTES.ADMIN_LOGIN} state={{ from: location }} replace />;
    }
    return children;
  }

  if (!isUserLoggedIn) {
    return <Navigate to={redirectTo || ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
