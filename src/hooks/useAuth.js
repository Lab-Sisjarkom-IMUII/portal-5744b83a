import { useAuth as useAuthContext } from "../contexts/AuthContext";

/**
 * useAuth hook
 * Wrapper untuk AuthContext dengan error handling
 * @returns {Object} Auth context values
 */
export function useAuth() {
  try {
    return useAuthContext();
  } catch (error) {
    // Return default values if context not available
    console.warn("useAuth: AuthContext not available, returning default values");
    return {
      user: null,
      isAuthenticated: false,
      isLoading: false,
      login: () => {},
      logout: () => {},
      refreshUser: () => {},
      initializeAuth: () => {},
    };
  }
}

