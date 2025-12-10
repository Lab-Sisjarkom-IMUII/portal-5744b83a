import { Modal } from "./Modal";
import { EditForm } from "./EditForm";

/**
 * EditModal component untuk edit project/portfolio metadata
 * @param {boolean} isOpen - Modal open state
 * @param {Function} onClose - Close handler
 * @param {Object} item - Project atau Portfolio object
 * @param {string} type - 'project' atau 'portfolio'
 * @param {Function} onSave - Save handler (formData) => Promise
 */
export function EditModal({ isOpen, onClose, item, type, onSave }) {
  if (!item) return null;
  
  const title = type === "project" ? "Edit Project" : "Edit Portfolio";
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <EditForm
        item={item}
        type={type}
        onSubmit={onSave}
        onCancel={onClose}
      />
    </Modal>
  );
}

