import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

const PurchaseModal = ({ closeModal, isOpen, tuition }) => {
  const { user } = useAuth();
  const { _id, subject, className, medium, location, schedule, phone, budget } =
    tuition || {};

  const handlePayment = async () => {
    try {
      const paymentInfo = {
        tuitionId: _id,
        subject,
        className,
        medium,
        location,
        schedule,
        phone,
        budget,
        name: subject,
        description: `Tuition for ${className} (${medium})`,
        price: budget, 
        quantity: 1,
        customer: { email: user?.email },
      };

      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/create-checkout-session`,
        paymentInfo
      );
      console.log(data);
      // Stripe checkout redirect
      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Payment failed:", error);
    }
  };

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={closeModal}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/20">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-md bg-white p-6 shadow-xl rounded-2xl duration-300 ease-out 
                       data-closed:transform-[scale(95%)] data-closed:opacity-0"
          >
            {/* Title */}
            <DialogTitle
              as="h3"
              className="text-xl font-semibold text-center text-gray-900"
            >
              Review Tuition Information
            </DialogTitle>

            {/* Tuition Info */}
            <div className="mt-4 space-y-3 text-gray-700 text-sm">
              <p>
                <span className="font-semibold">Subject:</span> {subject}
              </p>
              <p>
                <span className="font-semibold">Class:</span> {className}
              </p>
              <p>
                <span className="font-semibold">Medium:</span> {medium}
              </p>
              <p>
                <span className="font-semibold">Location:</span> {location}
              </p>
              <p>
                <span className="font-semibold">Schedule:</span> {schedule}
              </p>
              <p>
                <span className="font-semibold">Contact:</span> {phone}
              </p>
              <p className="text-green-700 font-semibold">Budget: ৳{budget}</p>
            </div>

            {/* Buttons */}
            <div className="flex justify-around mt-6">
              <button
                onClick={handlePayment}
                type="button"
                className="cursor-pointer inline-flex justify-center rounded-md bg-blue-600 px-4 py-2 
                           text-sm font-medium text-white hover:bg-blue-700"
              >
                Pay Now
              </button>

              <button
                type="button"
                onClick={closeModal}
                className="cursor-pointer inline-flex justify-center rounded-md bg-red-100 px-4 py-2 
                           text-sm font-medium text-red-900 hover:bg-red-200"
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

export default PurchaseModal;
