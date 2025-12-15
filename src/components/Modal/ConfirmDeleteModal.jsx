import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

const ConfirmDeleteModal = ({
  isOpen,
  closeModal,
  onConfirm,
  title,
  message,
}) => {
  return (
    <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-md bg-white rounded-2xl p-6">
          <DialogTitle className="text-xl font-semibold text-gray-900 mb-4">
            {title}
          </DialogTitle>

          <p className="text-gray-600 mb-6">{message}</p>

          <div className="flex gap-3">
            <button
              onClick={onConfirm}
              className="flex-1 py-2 px-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
            >
              Delete
            </button>
            <button
              onClick={closeModal}
              className="flex-1 py-2 px-4 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default ConfirmDeleteModal;
