import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

const PurchaseModal = ({ closeModal, isOpen, tuition }) => {
  const { user } = useAuth();

  const {
    _id,
    subject,
    class: className,
    location,
    perWeek,
    salary,
  } = tuition || {};

  const handlePayment = async () => {
    try {
      const paymentInfo = {
        tuitionId: _id,
        subject,
        className,
        location,
        perWeek,
        price: salary,
        quantity: 1,
        customer: {
          email: user?.email,
        },
      };

      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/create-checkout-session`,
        paymentInfo
      );

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
      className="relative z-50 focus:outline-none"
      onClose={closeModal}
    >
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/40" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel
          className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl
          transition-all duration-300"
        >
          {/* Title */}
          <DialogTitle
            as="h3"
            className="text-2xl font-bold text-center text-blue-600 mb-6"
          >
            Confirm Tuition Application
          </DialogTitle>

          {/* Tuition Info Card */}
          <div className="space-y-4 text-gray-700 text-sm">
            <InfoRow label="Subject" value={subject} />
            <InfoRow label="Class" value={`Class ${className}`} />
            <InfoRow label="Location" value={location} />
            <InfoRow label="Classes / Week" value={perWeek} />

            <hr />

            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-600">
                Monthly Salary
              </span>
              <span className="text-xl font-bold text-green-600">
                ৳ {Number(salary).toLocaleString()}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex gap-4">
            <button
              onClick={handlePayment}
              className="flex-1 rounded-xl bg-blue-600 px-4 py-3
              text-white font-semibold hover:bg-blue-700 transition"
            >
              Proceed to Payment
            </button>

            <button
              onClick={closeModal}
              className="flex-1 rounded-xl bg-gray-200 px-4 py-3
              text-gray-700 font-semibold hover:bg-gray-300 transition"
            >
              Cancel
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default PurchaseModal;

/* ---------- Small Reusable Row ---------- */

const InfoRow = ({ label, value }) => (
  <div className="flex justify-between items-center">
    <span className="text-gray-500">{label}</span>
    <span className="font-semibold text-gray-800">{value}</span>
  </div>
);
