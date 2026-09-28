import React, { createContext, useState, useContext, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => authService.getUser());
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(() => authService.isAuthenticated());
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => authService.isAdmin());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      if (authService.isAuthenticated()) {
        try {
          const user = await authService.getCurrentUser();
          if (user) {
            setCurrentUser(user);
            setIsUserLoggedIn(true);
            setIsAdminLoggedIn(user.role === 'admin' || user.is_staff || user.is_superuser);
          } else {
            authService.clearSession();
            setIsUserLoggedIn(false);
            setIsAdminLoggedIn(false);
            setCurrentUser(null);
          }
        } catch {
          authService.clearSession();
          setIsUserLoggedIn(false);
          setIsAdminLoggedIn(false);
          setCurrentUser(null);
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  // Standard User Login via Django SimpleJWT
  const loginUser = async (username, password) => {
    const res = await authService.login(username, password);
    if (res.success) {
      setCurrentUser(res.user);
      setIsUserLoggedIn(true);
      setIsAdminLoggedIn(res.user.role === 'admin' || res.user.is_staff || res.user.is_superuser);
      return { success: true, user: res.user };
    }
    return { success: false, message: res.message };
  };

  // Admin Login via Django SimpleJWT with role enforcement
  const loginAdmin = async (username, password) => {
    const res = await authService.login(username, password);
    if (res.success) {
      const user = res.user;
      if (user.role === 'admin' || user.is_staff || user.is_superuser) {
        setCurrentUser(user);
        setIsUserLoggedIn(true);
        setIsAdminLoggedIn(true);
        return { success: true, user };
      } else {
        await authService.logout();
        setIsAdminLoggedIn(false);
        return { success: false, message: 'Access Denied: This account does not possess administrator privileges.' };
      }
    }
    return { success: false, message: res.message };
  };

  // User Logout
  const logoutUser = async () => {
    await authService.logout();
    setIsUserLoggedIn(false);
    setIsAdminLoggedIn(false);
    setCurrentUser(null);
  };

  // Admin Logout
  const logoutAdmin = async () => {
    await authService.logout();
    setIsUserLoggedIn(false);
    setIsAdminLoggedIn(false);
    setCurrentUser(null);
  };

  // Password Change
  const changePassword = async (oldPassword, newPassword, confirmPassword) => {
    try {
      const res = await authService.changePassword(oldPassword, newPassword, confirmPassword);
      return { success: true, message: res.detail };
    } catch (err) {
      const errorMsg = err.response?.data?.detail ||
                       err.response?.data?.old_password?.[0] ||
                       err.response?.data?.confirm_password?.[0] ||
                       'Failed to update password.';
      return { success: false, message: errorMsg };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isUserLoggedIn,
        isAdminLoggedIn,
        loading,
        loginUser,
        loginAdmin,
        logoutUser,
        logoutAdmin,
        changePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthContext;
