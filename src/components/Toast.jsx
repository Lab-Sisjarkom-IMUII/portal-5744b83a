import { useEffect } from "react";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";

/**
 * Toast notification component
 * @param {string} message - Toast message
 * @param {string} type - 'success' | 'error' | 'warning' | 'info'
 * @param {boolean} isVisible - Visibility state
 * @param {Function} onClose - Close handler
 * @param {number} duration - Auto-dismiss duration in ms (default: 5000)
 */
export function Toast({
  message,
  type = "info",
  isVisible,
  onClose,
  duration = 5000,
}) {
  useEffect(() => {
    if (isVisible && duration > 0 && onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);
  
  if (!isVisible) return null;
  
  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info,
  };
  
  const styles = {
    success: "bg-green-500/20 text-green-400 border-green-500/30",
    error: "bg-red-500/20 text-red-400 border-red-500/30",
    warning: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    info: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  };
  
  const Icon = icons[type] || icons.info;
  const styleClass = styles[type] || styles.info;
  
  return (
    <div
      className={`
        fixed bottom-4 right-4 z-50
        flex items-center gap-3
        px-4 py-3
        rounded-lg border
        shadow-lg
        animate-in slide-in-from-bottom-5
        ${styleClass}
      `}
    >
      <Icon className="h-5 w-5 flex-shrink-0" />
      <p className="text-sm font-medium flex-1">{message}</p>
      {onClose && (
        <button
          onClick={onClose}
          className="p-1 rounded hover:bg-black/10 transition-colors"
          aria-label="Close toast"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

