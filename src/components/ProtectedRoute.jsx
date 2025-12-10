import { Navigate } from "react-router-dom";
import { Spinner } from "./Spinner";
import { useAuth } from "../hooks/useAuth";
import { redirectToLogin } from "../services/authService";

/**
 * Protected Route component
 * Redirects to login if not authenticated
 * @param {React.ReactNode} children - Protected content
 */
export function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();
  
  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Spinner size="lg" />
      </div>
    );
  }
  
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    redirectToLogin(window.location.pathname);
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Spinner size="lg" />
        <p className="ml-4 text-[var(--foreground)]/60">
          Redirecting to login...
        </p>
      </div>
    );
  }
  
  // Render protected content
  return children;
}

