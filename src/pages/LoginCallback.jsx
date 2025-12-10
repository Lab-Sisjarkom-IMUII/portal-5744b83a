import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../components/Spinner";
import { handleLoginCallback } from "../services/authService";

/**
 * Login Callback Page
 * Handles redirect from imuii-web after login
 */
export function LoginCallback() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const processCallback = async () => {
      try {
        const returnUrl = handleLoginCallback();
        
        if (returnUrl) {
          // Small delay to ensure token is set
          setTimeout(() => {
            navigate(returnUrl);
          }, 500);
        } else {
          setError("Failed to process login callback");
          setTimeout(() => {
            navigate("/");
          }, 2000);
        }
      } catch (err) {
        console.error("Login callback error:", err);
        setError("An error occurred during login");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    };
    
    processCallback();
  }, [navigate]);
  
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <Spinner size="lg" />
        <p className="mt-4 text-[var(--foreground)]/60">
          {error || "Verifying authentication..."}
        </p>
      </div>
    </div>
  );
}

