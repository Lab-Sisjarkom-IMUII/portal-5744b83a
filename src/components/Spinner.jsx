import { Loader2 } from "lucide-react";

/**
 * Spinner component untuk loading states
 * @param {string} size - 'sm' | 'md' | 'lg'
 * @param {string} color - Spinner color (optional)
 */
export function Spinner({ size = "md", color = "var(--primary)" }) {
  const sizes = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  };
  
  const sizeClass = sizes[size] || sizes.md;
  
  return (
    <Loader2 
      className={`${sizeClass} animate-spin`}
      style={{ color }}
    />
  );
}

