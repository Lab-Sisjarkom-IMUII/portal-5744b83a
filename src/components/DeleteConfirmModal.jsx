import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";
import { Modal } from "./Modal";
import { Button } from "./Button";

/**
 * Delete Confirmation Modal
 * Confirmation dialog untuk delete actions
 * @param {boolean} isOpen - Modal open state
 * @param {Function} onClose - Close handler
 * @param {Function} onConfirm - Confirm handler
 * @param {string} title - Modal title (default: "Confirm Delete")
 * @param {string} message - Confirmation message
 * @param {string} itemName - Name of item to delete (optional)
 * @param {boolean} loading - Loading state
 */
export function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Delete",
  message,
  itemName,
  loading = false,
}) {
  // Handle Enter key untuk confirm
  useEffect(() => {
    const handleEnter = (e) => {
      if (e.key === "Enter" && isOpen && !loading) {
        onConfirm();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEnter);
    }

    return () => {
      document.removeEventListener("keydown", handleEnter);
    };
  }, [isOpen, onConfirm, loading]);

  const defaultMessage = itemName
    ? `Are you sure you want to delete "${itemName}"? This action cannot be undone.`
    : "Are you sure you want to delete this item? This action cannot be undone.";

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} className="max-w-md">
      <div className="space-y-4">
        {/* Warning Icon */}
        <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-full bg-red-500/10">
          <AlertTriangle className="h-8 w-8 text-red-500" />
        </div>

        {/* Message */}
        <div className="text-center">
          <p className="text-[var(--foreground)]">
            {message || defaultMessage}
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-[var(--border)]">
          <Button
            variant="secondary"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            variant="accent"
            onClick={onConfirm}
            loading={loading}
            disabled={loading}
            className="bg-red-500 hover:bg-red-600 focus:ring-red-500"
          >
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
}

