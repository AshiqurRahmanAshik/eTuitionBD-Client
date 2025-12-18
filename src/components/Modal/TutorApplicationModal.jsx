import { useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { toast } from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const TutorApplicationModal = ({ closeModal, isOpen, tuition }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    qualifications: "",
    experience: "",
    expectedSalary: "",
  });

  const { _id: tuitionId, subject, class: className, location } = tuition || {};

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const applicationData = {
        tuitionId,
        qualifications: formData.qualifications,
        experience: formData.experience,
        expectedSalary: parseFloat(formData.expectedSalary),
      };

      await axiosSecure.post("/applications", applicationData);

      toast.success("Application submitted successfully!");
      closeModal();

      // Reset form
      setFormData({
        qualifications: "",
        experience: "",
        expectedSalary: "",
      });
    } catch (error) {
      console.error("Application failed:", error);
      if (error.response?.status === 409) {
        toast.error("You have already applied to this tuition");
      } else {
        toast.error(
          error.response?.data?.message || "Failed to submit application"
        );
      }
    } finally {
      setIsSubmitting(false);
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
      <div className="fixed inset-0 bg-black/50" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-md rounded-xl bg-white shadow-2xl">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-t-xl">
            <DialogTitle as="h3" className="text-xl font-bold text-white">
              Apply for Tuition
            </DialogTitle>
            <p className="text-blue-100 text-sm mt-1">
              {subject} - Class {className}
            </p>
          </div>

          {/* Content */}
          <div className="p-4">
            {/* Application Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Name (Read-only) */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={user?.displayName || user?.name || ""}
                  readOnly
                  className="w-full px-3 py-2 text-sm bg-gray-100 border border-gray-300 rounded-lg text-gray-600 cursor-not-allowed"
                />
              </div>

              {/* Email (Read-only) */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={user?.email || ""}
                  readOnly
                  className="w-full px-3 py-2 text-sm bg-gray-100 border border-gray-300 rounded-lg text-gray-600 cursor-not-allowed"
                />
              </div>

              {/* Qualifications */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Qualifications <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="qualifications"
                  value={formData.qualifications}
                  onChange={handleChange}
                  required
                  rows="2"
                  placeholder="e.g., BSc in Computer Science"
                  className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none resize-none"
                />
              </div>

              {/* Experience */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Experience <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  required
                  rows="2"
                  placeholder="e.g., 3 years teaching ICT"
                  className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none resize-none"
                />
              </div>

              {/* Expected Salary */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Expected Salary (per month){" "}
                  <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold text-sm">
                    ৳
                  </span>
                  <input
                    type="number"
                    name="expectedSalary"
                    value={formData.expectedSalary}
                    onChange={handleChange}
                    required
                    min="1"
                    placeholder="5000"
                    className="w-full pl-8 pr-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-2.5 text-sm bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>

                <button
                  type="button"
                  onClick={closeModal}
                  disabled={isSubmitting}
                  className="flex-1 py-2.5 text-sm bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default TutorApplicationModal;
