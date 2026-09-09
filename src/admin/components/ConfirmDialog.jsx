import PropTypes from "prop-types";
import Modal from "../../components/Modal";
import Button from "../../components/Button";

export default function ConfirmDialog({ isOpen, title, message, onConfirm, onCancel, confirming }) {
  return (
    <Modal isOpen={isOpen} onClose={onCancel} title={title || "Are you sure?"} size="sm">
      <p className="text-slate-600 mb-6">{message}</p>
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm} loading={confirming}>
          Delete
        </Button>
      </div>
    </Modal>
  );
}

ConfirmDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.string,
  message: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  confirming: PropTypes.bool,
};
