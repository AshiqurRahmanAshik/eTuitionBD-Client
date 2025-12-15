import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { toast } from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import EditTuitionModal from "../../../components/Modal/EditTuitionModal";
import ConfirmDeleteModal from "../../../components/Modal/ConfirmDeleteModal";

const MyTuitions = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedTuition, setSelectedTuition] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const {
    data: tuitions = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myTuitions"],
    queryFn: async () => {
      const res = await axiosSecure.get("/my-tuitions");
      return res.data;
    },
  });

  const handleEdit = (tuition) => {
    setSelectedTuition(tuition);
    setIsEditModalOpen(true);
  };

  const handleDelete = (tuition) => {
    setSelectedTuition(tuition);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await axiosSecure.delete(`/tuitions/${selectedTuition._id}`);
      toast.success("Tuition deleted successfully");
      refetch();
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Error deleting tuition:", error);
      toast.error("Failed to delete tuition");
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      pending: "bg-yellow-100 text-yellow-800",
      approved: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
      hired: "bg-blue-100 text-blue-800",
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
          styles[status] || "bg-gray-100 text-gray-800"
        }`}
      >
        {status}
      </span>
    );
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">My Tuitions</h2>
          <p className="text-gray-600 mt-1">
            Manage your tuition posts and applications
          </p>
        </div>
        <Link
          to="/dashboard/post-tuition"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
        >
          + Post New Tuition
        </Link>
      </div>

      {/* Tuitions List */}
      {tuitions.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <div className="text-gray-400 text-6xl mb-4">📚</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            No Tuitions Posted Yet
          </h3>
          <p className="text-gray-600 mb-6">
            Start by posting your first tuition requirement
          </p>
          <Link
            to="/dashboard/post-tuition"
            className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
          >
            Post Tuition
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {tuitions.map((tuition) => (
            <div
              key={tuition._id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {tuition.subject} - Class {tuition.class}
                  </h3>
                  <div className="flex gap-2 mb-2">
                    {getStatusBadge(tuition.status)}
                    {tuition.status === "hired" && (
                      <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-semibold">
                        Tutor Hired
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-600">
                    ৳{tuition.salary}
                  </p>
                  <p className="text-sm text-gray-600">per month</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Location:</span>{" "}
                    {tuition.location}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Classes/Week:</span>{" "}
                    {tuition.perWeek}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Student Gender:</span>{" "}
                    {tuition.studentGender}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Preferred Tutor:</span>{" "}
                    {tuition.tutorGender}
                  </p>
                </div>
              </div>

              {tuition.tutorRequirements && (
                <p className="text-sm text-gray-700 mb-4">
                  <span className="font-semibold">Requirements:</span>{" "}
                  {tuition.tutorRequirements}
                </p>
              )}

              <div className="flex gap-3 flex-wrap">
                {/* View Applications Button */}
                <Link
                  to={`/dashboard/applied-tutors/${tuition._id}`}
                  className="px-4 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 font-semibold rounded-lg transition-colors"
                >
                  View Applications
                </Link>

                {/* Edit Button - Only for pending status */}
                {tuition.status === "pending" && (
                  <button
                    onClick={() => handleEdit(tuition)}
                    className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold rounded-lg transition-colors"
                  >
                    Edit
                  </button>
                )}

                {/* Delete Button - Can't delete hired tuitions */}
                {tuition.status !== "hired" && (
                  <button
                    onClick={() => handleDelete(tuition)}
                    className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-700 font-semibold rounded-lg transition-colors"
                  >
                    Delete
                  </button>
                )}

                {/* Posted Date */}
                <span className="ml-auto text-sm text-gray-500 self-center">
                  Posted: {new Date(tuition.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modals */}
      {selectedTuition && (
        <>
          <EditTuitionModal
            isOpen={isEditModalOpen}
            closeModal={() => setIsEditModalOpen(false)}
            tuition={selectedTuition}
            refetch={refetch}
          />
          <ConfirmDeleteModal
            isOpen={isDeleteModalOpen}
            closeModal={() => setIsDeleteModalOpen(false)}
            onConfirm={confirmDelete}
            title="Delete Tuition"
            message={`Are you sure you want to delete "${selectedTuition.subject} - Class ${selectedTuition.class}"? This action cannot be undone.`}
          />
        </>
      )}
    </div>
  );
};

export default MyTuitions;
