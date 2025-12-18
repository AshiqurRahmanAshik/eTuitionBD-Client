import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import ViewApplicationModal from "../../../components/Modal/ViewApplicationModal";

const AppliedTutors = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [processingId, setProcessingId] = useState(null);

  // Fetch tuition details
  const { data: tuition, isLoading: tuitionLoading } = useQuery({
    queryKey: ["tuition", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tuitions/${id}`);
      return res.data;
    },
  });

  // Fetch applications
  const {
    data: applications = [],
    isLoading: appsLoading,
    refetch,
  } = useQuery({
    queryKey: ["applications", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tuitions/${id}/applications`);
      return res.data;
    },
  });

  const handleViewDetails = (application) => {
    setSelectedApplication(application);
    setIsModalOpen(true);
  };

  // Toast-based confirmation
  const confirmAction = (message) =>
    new Promise((resolve) => {
      const id = toast(
        (t) => (
          <div className="flex flex-col gap-2">
            <span>{message}</span>
            <div className="flex justify-end gap-2 mt-2">
              <button
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                onClick={() => {
                  toast.dismiss(id);
                  resolve(false);
                }}
              >
                Cancel
              </button>
              <button
                className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                onClick={() => {
                  toast.dismiss(id);
                  resolve(true);
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        ),
        { duration: Infinity }
      );
    });

  const handleApprove = async (application) => {
    const confirmed = await confirmAction(
      `Proceed to payment for ${application.tutorName}? You will pay ৳${application.expectedSalary}.`
    );
    if (!confirmed) return;

    setProcessingId(application._id);

    try {
      // Create checkout session
      const res = await axiosSecure.post("/create-checkout-session", {
        applicationId: application._id,
        tuitionId: id,
        expectedSalary: application.expectedSalary,
      });

      // Redirect to Stripe checkout
      window.location.href = res.data.url;
    } catch (error) {
      console.error("Error creating payment:", error);
      toast.error("Failed to create payment session");
      setProcessingId(null);
    }
  };

  const handleReject = async (applicationId) => {
    const confirmed = await confirmAction(
      "Are you sure you want to reject this application?"
    );
    if (!confirmed) return;

    setProcessingId(applicationId);

    try {
      await axiosSecure.patch(`/applications/${applicationId}/reject`);
      toast.success("Application rejected");
      refetch();
    } catch (error) {
      console.error("Error rejecting application:", error);
      toast.error("Failed to reject application");
    } finally {
      setProcessingId(null);
    }
  };

  if (tuitionLoading || appsLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => navigate("/dashboard/my-tuitions")}
          className="text-blue-600 hover:text-blue-800 mb-2"
        >
          ← Back to My Tuitions
        </button>
        <h2 className="text-2xl font-semibold text-gray-800">
          Applications for {tuition?.subject} - Class {tuition?.class}
        </h2>
        <p className="text-gray-600 mt-1">
          Review and approve tutor applications
        </p>
      </div>

      {/* Tuition Info Card */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-600">Location</p>
            <p className="font-semibold">{tuition?.location}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Salary</p>
            <p className="font-semibold text-green-600">
              ৳{tuition?.salary?.toLocaleString()}/month
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Status</p>
            <p className="font-semibold capitalize">{tuition?.status}</p>
          </div>
        </div>
      </div>

      {/* Applications List */}
      {applications.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <div className="text-gray-400 text-6xl mb-4">👥</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            No Applications Yet
          </h3>
          <p className="text-gray-600">
            Tutors haven't applied to this tuition yet. Please wait.
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {applications.map((application) => (
            <div
              key={application._id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start gap-4">
                {/* Tutor Image */}
                {application.tutorImage && (
                  <img
                    src={application.tutorImage}
                    alt={application.tutorName}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                )}

                {/* Tutor Info */}
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">
                        {application.tutorName}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {application.tutorEmail}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold capitalize ${
                        application.status === "approved"
                          ? "bg-green-100 text-green-800"
                          : application.status === "rejected"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {application.status}
                    </span>
                  </div>

                  <div className="grid md:grid-cols-2 gap-3 mb-3">
                    <div>
                      <p className="text-sm text-gray-600">Qualifications</p>
                      <p className="font-medium text-gray-800">
                        {application.qualifications}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Experience</p>
                      <p className="font-medium text-gray-800">
                        {application.experience}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Expected Salary</p>
                      <p className="text-xl font-bold text-green-600">
                        ৳{application.expectedSalary?.toLocaleString()}/month
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleViewDetails(application)}
                        className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold rounded-lg transition-colors"
                      >
                        View Details
                      </button>

                      {application.status === "pending" && (
                        <>
                          <button
                            onClick={() => handleApprove(application)}
                            disabled={processingId === application._id}
                            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                              processingId === application._id
                                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                                : "bg-green-600 hover:bg-green-700 text-white"
                            }`}
                          >
                            {processingId === application._id
                              ? "Processing..."
                              : "Accept & Pay"}
                          </button>
                          <button
                            onClick={() => handleReject(application._id)}
                            disabled={processingId === application._id}
                            className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-700 font-semibold rounded-lg transition-colors"
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-500 mt-3">
                Applied: {new Date(application.appliedAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* View Details Modal */}
      {selectedApplication && (
        <ViewApplicationModal
          isOpen={isModalOpen}
          closeModal={() => setIsModalOpen(false)}
          application={selectedApplication}
        />
      )}
    </div>
  );
};

export default AppliedTutors;
