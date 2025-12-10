import { useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "./Button";

/**
 * Modal component dengan backdrop dan close functionality
 * @param {boolean} isOpen - Modal open state
 * @param {Function} onClose - Close handler
 * @param {string} title - Modal title (optional)
 * @param {React.ReactNode} children - Modal content
 * @param {string} className - Additional classes
 */
export function Modal({ isOpen, onClose, title, children, className = "" }) {
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);
  
  if (!isOpen) return null;
  
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
      
      {/* Modal Content */}
      <div
        className={`
          relative z-50 
          w-full max-w-lg 
          bg-[var(--card)] 
          border border-[var(--border)] 
          rounded-lg 
          shadow-xl
          max-h-[90vh]
          overflow-y-auto
          ${className}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        {(title || onClose) && (
          <div className="flex items-center justify-between p-6 border-b border-[var(--border)]">
            {title && (
              <h2 className="text-xl font-semibold text-[var(--foreground)]">
                {title}
              </h2>
            )}
            {onClose && (
              <button
                onClick={onClose}
                className="p-1 rounded-lg hover:bg-[var(--muted)] transition-colors"
                aria-label="Close modal"
              >
                <X className="h-5 w-5 text-[var(--foreground)]" />
              </button>
            )}
          </div>
        )}
        
        {/* Content */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}

