import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import {
  FaTimes,
  FaGraduationCap,
  FaBriefcase,
  FaMoneyBillWave,
  FaCalendar,
  FaUser,
  FaEnvelope,
} from "react-icons/fa";

const ViewApplicationModal = ({ isOpen, closeModal, application }) => {
  if (!application) return null;

  return (
    <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-t-2xl">
            <div className="flex justify-between items-center">
              <DialogTitle className="text-2xl font-bold text-white">
                Application Details
              </DialogTitle>
              <button
                onClick={closeModal}
                className="text-white hover:bg-white/20 p-2 rounded-full transition"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Tutor Info */}
            <div className="flex items-start gap-4 mb-6 pb-6 border-b border-gray-200">
              {application.tutorImage && (
                <img
                  src={application.tutorImage}
                  alt={application.tutorName}
                  className="w-20 h-20 rounded-full object-cover border-2 border-blue-500 shadow-lg"
                />
              )}
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-800 mb-1">
                  {application.tutorName}
                </h3>
                <p className="text-gray-600 text-sm mb-2">
                  {application.tutorEmail}
                </p>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                    application.status === "approved"
                      ? "bg-green-100 text-green-800"
                      : application.status === "rejected"
                      ? "bg-red-100 text-red-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {application.status.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Details Grid */}
            <div className="space-y-4">
              {/* Qualifications */}
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <FaGraduationCap className="text-blue-600 text-lg" />
                  <h4 className="font-semibold text-gray-800">
                    Qualifications
                  </h4>
                </div>
                <p className="text-gray-700 ml-6">
                  {application.qualifications}
                </p>
              </div>

              {/* Experience */}
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <div className="flex items-center gap-2 mb-2">
                  <FaBriefcase className="text-purple-600 text-lg" />
                  <h4 className="font-semibold text-gray-800">Experience</h4>
                </div>
                <p className="text-gray-700 ml-6">{application.experience}</p>
              </div>

              {/* Expected Salary */}
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  <FaMoneyBillWave className="text-green-600 text-lg" />
                  <h4 className="font-semibold text-gray-800">
                    Expected Salary
                  </h4>
                </div>
                <p className="text-2xl font-bold text-green-600 ml-6">
                  ৳{application.expectedSalary?.toLocaleString()}/month
                </p>
              </div>

              {/* Applied Date */}
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <FaCalendar className="text-gray-600 text-lg" />
                  <h4 className="font-semibold text-gray-800">Applied On</h4>
                </div>
                <p className="text-gray-700 ml-6">
                  {new Date(application.appliedAt).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>

              {/* Status Updates */}
              {application.approvedAt && (
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    ✓ Approved On
                  </h4>
                  <p className="text-gray-700">
                    {new Date(application.approvedAt).toLocaleDateString(
                      "en-US",
                      {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </p>
                </div>
              )}

              {application.rejectedAt && (
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    ✗ Rejected On
                  </h4>
                  <p className="text-gray-700">
                    {new Date(application.rejectedAt).toLocaleDateString(
                      "en-US",
                      {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 bg-gray-50 rounded-b-2xl flex justify-end">
            <button
              onClick={closeModal}
              className="px-6 py-2 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition"
            >
              Close
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default ViewApplicationModal;
