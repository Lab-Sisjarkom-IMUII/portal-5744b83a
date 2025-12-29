import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";

/**
 * SearchBar component dengan debounce
 * @param {string} value - Search value
 * @param {Function} onChange - Change handler (called dengan debounced value)
 * @param {string} placeholder - Placeholder text
 */
export function SearchBar({ value, onChange, placeholder = "Search..." }) {
  const [localValue, setLocalValue] = useState(value || "");
  const [debouncedValue, setDebouncedValue] = useState(value || "");

  // Debounce logic
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(localValue);
    }, 300);

    return () => clearTimeout(timer);
  }, [localValue]);

  // Call onChange when debounced value changes
  useEffect(() => {
    if (debouncedValue !== value) {
      onChange(debouncedValue);
    }
  }, [debouncedValue, onChange, value]);

  // Sync local value with prop value
  useEffect(() => {
    setLocalValue(value || "");
  }, [value]);

  const handleChange = (e) => {
    setLocalValue(e.target.value);
  };

  const handleClear = () => {
    setLocalValue("");
    setDebouncedValue("");
    onChange("");
  };

  return (
    <div className="relative">
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
        <Search className="h-5 w-5 text-[var(--foreground)]/40" />
      </div>
      
      <input
        type="text"
        value={localValue}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full pl-10 pr-10 py-2 sm:py-2 bg-[var(--card)] border border-[var(--border)] rounded-lg text-sm sm:text-base text-[var(--foreground)] placeholder:text-[var(--foreground)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50 focus:border-[var(--primary)] transition-all duration-200 min-h-[44px] sm:min-h-0"
      />
      
      {localValue && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-[var(--muted)] rounded transition-colors"
          aria-label="Clear search"
        >
          <X className="h-4 w-4 text-[var(--foreground)]/60" />
        </button>
      )}
    </div>
  );
}

