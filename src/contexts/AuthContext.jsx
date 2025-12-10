import { createContext, useContext, useState, useEffect } from "react";
import { getAuthToken } from "../utils/auth";
import { isTokenValid as checkTokenValid } from "../utils/jwt";
import { verifyToken } from "../services/userService";

const AuthContext = createContext(null);

/**
 * AuthProvider component
 * Manages authentication state globally
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Initialize authentication
   * Check token and verify with API
   */
  const initializeAuth = async () => {
    setIsLoading(true);
    
    try {
      const token = getAuthToken();
      
      if (!token || !checkTokenValid(token)) {
        setIsAuthenticated(false);
        setUser(null);
        setIsLoading(false);
        return;
      }
      
      // Verify token with API
      const response = await verifyToken();
      
      if (response.authenticated && response.user) {
        setUser(response.user);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Auth initialization error:", error);
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Login function
   * @param {Object} userData - User data
   */
  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    setIsLoading(false);
  };

  /**
   * Logout function
   */
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setIsLoading(false);
  };

  /**
   * Refresh user data
   */
  const refreshUser = async () => {
    try {
      const response = await verifyToken();
      
      if (response.authenticated && response.user) {
        setUser(response.user);
        setIsAuthenticated(true);
      } else {
        logout();
      }
    } catch (error) {
      console.error("Failed to refresh user:", error);
      logout();
    }
  };

  // Initialize auth on mount
  useEffect(() => {
    initializeAuth();
  }, []);

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    refreshUser,
    initializeAuth,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * useAuth hook
 * Access authentication context
 * @returns {Object} Auth context values
 */
export function useAuth() {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  
  return context;
}

