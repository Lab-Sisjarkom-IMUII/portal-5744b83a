/**
 * Input component dengan label dan error support
 * @param {string} type - Input type
 * @param {string} placeholder - Placeholder text
 * @param {string} value - Input value
 * @param {Function} onChange - Change handler
 * @param {string} label - Label text (optional)
 * @param {string} error - Error message (optional)
 * @param {boolean} disabled - Disabled state
 * @param {string} className - Additional classes
 */
export function Input({
  type = "text",
  placeholder,
  value,
  onChange,
  label,
  error,
  disabled = false,
  className = "",
  ...props
}) {
  const inputStyles = `
    w-full px-4 py-2 
    bg-[var(--card)] 
    border border-[var(--border)] 
    rounded-lg 
    text-[var(--foreground)] 
    placeholder:text-[var(--foreground)]/50
    focus:outline-none 
    focus:ring-2 
    focus:ring-[var(--primary)]/50 
    focus:border-[var(--primary)]
    transition-all duration-200
    disabled:opacity-50 
    disabled:cursor-not-allowed
    ${error ? "border-red-500 focus:ring-red-500/50" : ""}
  `;
  
  return (
    <div className="w-full">
      {label && (
        <label className="block mb-2 text-sm font-medium text-[var(--foreground)]">
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`${inputStyles} ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}

