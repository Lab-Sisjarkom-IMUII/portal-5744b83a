/**
 * Card component untuk container content
 * @param {React.ReactNode} children - Card content
 * @param {string} className - Additional classes
 * @param {Function} onClick - Click handler (optional)
 */
export function Card({ children, className = "", onClick, ...props }) {
  const baseStyles = "bg-[var(--card)] border border-[var(--border)] rounded-lg shadow-sm transition-all duration-200";
  const hoverStyles = onClick ? "cursor-pointer hover:shadow-md hover:border-[var(--primary)]/30" : "";
  
  return (
    <div
      onClick={onClick}
      className={`${baseStyles} ${hoverStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

