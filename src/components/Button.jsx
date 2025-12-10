import { Loader2 } from "lucide-react";

/**
 * Button component dengan berbagai variants dan sizes
 * @param {string} variant - 'primary' | 'secondary' | 'accent'
 * @param {string} size - 'sm' | 'md' | 'lg'
 * @param {React.ReactNode} children - Button content
 * @param {Function} onClick - Click handler
 * @param {boolean} disabled - Disabled state
 * @param {boolean} loading - Loading state dengan spinner
 * @param {string} className - Additional classes
 */
export function Button({
  variant = "primary",
  size = "md",
  children,
  onClick,
  disabled = false,
  loading = false,
  className = "",
  type = "button",
  ...props
}) {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90 focus:ring-[var(--primary)]",
    secondary: "bg-[var(--muted)] text-[var(--foreground)] hover:bg-[var(--card)] border border-[var(--border)] focus:ring-[var(--primary)]",
    accent: "bg-[var(--accent)] text-white hover:opacity-90 focus:ring-[var(--accent)]",
  };
  
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };
  
  const variantClass = variants[variant] || variants.primary;
  const sizeClass = sizes[size] || sizes.md;
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${variantClass} ${sizeClass} ${className}`}
      {...props}
    >
      {loading && (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      )}
      {children}
    </button>
  );
}

