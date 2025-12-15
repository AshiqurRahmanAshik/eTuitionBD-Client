import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { toast } from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import ConfirmDeleteModal from "../../../components/Modal/ConfirmDeleteModal";

const MyApplications = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedApp, setSelectedApp] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const {
    data: applications = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myApplications"],
    queryFn: async () => {
      const res = await axiosSecure.get("/my-applications");
      return res.data;
    },
  });

  const handleDelete = (app) => {
    setSelectedApp(app);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await axiosSecure.delete(`/applications/${selectedApp._id}`);
      toast.success("Application deleted successfully");
      refetch();
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Error deleting application:", error);
      toast.error(error.response?.data?.message || "Failed to delete");
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const pending = applications.filter((a) => a.status === "pending");
  const approved = applications.filter((a) => a.status === "approved");
  const rejected = applications.filter((a) => a.status === "rejected");

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          My Applications
        </h2>
        <p className="text-gray-600 mt-1">
          Track the status of your tuition applications
        </p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-gray-600">Pending</p>
          <p className="text-2xl font-bold text-yellow-600">{pending.length}</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-sm text-gray-600">Approved</p>
          <p className="text-2xl font-bold text-green-600">{approved.length}</p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-sm text-gray-600">Rejected</p>
          <p className="text-2xl font-bold text-red-600">{rejected.length}</p>
        </div>
      </div>

      {/* Applications List */}
      {applications.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <div className="text-gray-400 text-6xl mb-4">📋</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            No Applications Yet
          </h3>
          <p className="text-gray-600 mb-6">
            Browse available tuitions and apply
          </p>
          <Link
            to="/tuitions"
            className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg"
          >
            Browse Tuitions
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <div
              key={app._id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {app.tuition?.subject} - Class {app.tuition?.class}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {app.tuition?.location}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold capitalize ${
                    app.status === "approved"
                      ? "bg-green-100 text-green-800"
                      : app.status === "rejected"
                      ? "bg-red-100 text-red-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {app.status}
                </span>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600">Your Expected Salary</p>
                  <p className="font-semibold text-green-600">
                    ৳{app.expectedSalary?.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Qualifications</p>
                  <p className="font-medium text-gray-800">
                    {app.qualifications}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Experience</p>
                  <p className="font-medium text-gray-800">{app.experience}</p>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">
                  Applied: {new Date(app.appliedAt).toLocaleDateString()}
                </p>

                {app.status === "pending" && (
                  <button
                    onClick={() => handleDelete(app)}
                    className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-700 font-semibold rounded-lg transition-colors"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Modal */}
      {selectedApp && (
        <ConfirmDeleteModal
          isOpen={isDeleteModalOpen}
          closeModal={() => setIsDeleteModalOpen(false)}
          onConfirm={confirmDelete}
          title="Delete Application"
          message="Are you sure you want to delete this application? This action cannot be undone."
        />
      )}
    </div>
  );
};

export default MyApplications;
