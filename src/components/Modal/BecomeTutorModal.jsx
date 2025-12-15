import { Dialog, DialogTitle, DialogPanel } from "@headlessui/react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-hot-toast";

const BecomeTutorModal = ({ closeModal, isOpen }) => {
  const axiosSecure = useAxiosSecure();

  const handleRequest = async () => {
    try {
      await axiosSecure.post("/become-tutor");
      toast.success("Tutor request sent successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send request");
    } finally {
      closeModal();
    }
  };

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={closeModal} 
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel className="w-full max-w-md bg-white p-6 shadow-xl rounded-2xl">
            <DialogTitle
              as="h3"
              className="text-lg font-medium text-center text-gray-900"
            >
              Become A Tutor!
            </DialogTitle>

            <p className="mt-2 text-sm text-gray-500 text-center">
              Please read all the terms & conditions before becoming a Tutor.
            </p>

            <hr className="my-6" />

            <div className="flex justify-around">
              <button
                onClick={handleRequest}
                className="px-4 py-2 text-sm font-medium text-green-900 bg-green-100 rounded-md hover:bg-green-200"
              >
                Continue
              </button>

              <button
                onClick={closeModal}
                className="px-4 py-2 text-sm font-medium text-red-900 bg-red-100 rounded-md hover:bg-red-200"
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default BecomeTutorModal;
