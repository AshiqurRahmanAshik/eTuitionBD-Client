import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

const ManageTuitions = () => {
  const axiosSecure = useAxiosSecure();
  const [filter, setFilter] = useState("all"); // all, pending, approved, rejected
  const [processingId, setProcessingId] = useState(null);

  const {
    data: tuitions = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["adminTuitions"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/tuitions");
      return res.data;
    },
  });

  // Custom toast confirmation
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

  const handleApprove = async (tuitionId) => {
    const confirmed = await confirmAction("Approve this tuition post?");
    if (!confirmed) return;

    setProcessingId(tuitionId);
    try {
      await axiosSecure.patch(`/admin/tuitions/${tuitionId}/approve`);
      toast.success("Tuition approved successfully");
      refetch();
    } catch (error) {
      console.error("Error approving tuition:", error);
      toast.error("Failed to approve tuition");
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (tuitionId) => {
    const confirmed = await confirmAction("Reject this tuition post?");
    if (!confirmed) return;

    setProcessingId(tuitionId);
    try {
      await axiosSecure.patch(`/admin/tuitions/${tuitionId}/reject`);
      toast.success("Tuition rejected");
      refetch();
    } catch (error) {
      console.error("Error rejecting tuition:", error);
      toast.error("Failed to reject tuition");
    } finally {
      setProcessingId(null);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const filteredTuitions =
    filter === "all" ? tuitions : tuitions.filter((t) => t.status === filter);

  const pending = tuitions.filter((t) => t.status === "pending").length;
  const approved = tuitions.filter((t) => t.status === "approved").length;
  const rejected = tuitions.filter((t) => t.status === "rejected").length;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header & Stats */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Manage Tuitions
        </h2>
        <p className="text-gray-600 mt-1">
          Approve or reject tuition posts from students
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-gray-600">Total</p>
          <p className="text-2xl font-bold text-blue-600">{tuitions.length}</p>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-gray-600">Pending</p>
          <p className="text-2xl font-bold text-yellow-600">{pending}</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-sm text-gray-600">Approved</p>
          <p className="text-2xl font-bold text-green-600">{approved}</p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-sm text-gray-600">Rejected</p>
          <p className="text-2xl font-bold text-red-600">{rejected}</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex gap-2">
          {["all", "pending", "approved", "rejected", "hired"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg font-semibold capitalize transition-colors ${
                filter === status
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Tuition List */}
      {filteredTuitions.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <p className="text-gray-600">No tuitions found for this filter</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredTuitions.map((tuition) => (
            <div
              key={tuition._id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {tuition.subject} - Class {tuition.class}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Posted by: {tuition.postedBy?.email}
                  </p>
                </div>
                <div className="text-right">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-semibold capitalize mb-2 ${
                      tuition.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : tuition.status === "approved"
                        ? "bg-green-100 text-green-800"
                        : tuition.status === "rejected"
                        ? "bg-red-100 text-red-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {tuition.status}
                  </span>
                  <p className="text-xl font-bold text-green-600">
                    ৳{tuition.salary?.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600">Location</p>
                  <p className="font-medium text-gray-800">
                    {tuition.location}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Classes/Week</p>
                  <p className="font-medium text-gray-800">{tuition.perWeek}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Student Gender</p>
                  <p className="font-medium text-gray-800">
                    {tuition.studentGender}
                  </p>
                </div>
              </div>

              {tuition.tutorRequirements && (
                <p className="text-sm text-gray-700 mb-4">
                  <span className="font-semibold">Requirements:</span>{" "}
                  {tuition.tutorRequirements}
                </p>
              )}

              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">
                  Posted: {new Date(tuition.createdAt).toLocaleDateString()}
                </p>

                {tuition.status === "pending" && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleApprove(tuition._id)}
                      disabled={processingId === tuition._id}
                      className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                        processingId === tuition._id
                          ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                          : "bg-green-600 hover:bg-green-700 text-white"
                      }`}
                    >
                      {processingId === tuition._id
                        ? "Processing..."
                        : "Approve"}
                    </button>
                    <button
                      onClick={() => handleReject(tuition._id)}
                      disabled={processingId === tuition._id}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageTuitions;
