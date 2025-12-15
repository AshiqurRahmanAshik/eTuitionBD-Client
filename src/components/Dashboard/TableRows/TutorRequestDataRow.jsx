import { useState } from "react";
import toast from "react-hot-toast";

const TutorRequestDataRow = ({ request, refetch }) => {
  const [isLoading, setIsLoading] = useState(false);

  // Safety check
  if (!request || !request.email) {
    console.warn("Invalid request data:", request);
    return null;
  }

  const handleApprove = async () => {
    if (isLoading) return;

    // Confirmation before approving
    if (
      !window.confirm(`Are you sure you want to make ${request.email} a tutor?`)
    ) {
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/approve-tutor`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
        body: JSON.stringify({ email: request.email }),
      });

      const data = await res.json();
      console.log("Approve response:", data);

      if (!res.ok) {
        throw new Error(data.message || "Failed to approve tutor");
      }

      alert("✅ Tutor approved successfully!");
      // Or use toast: toast.success("Tutor approved successfully!");
      refetch(); // refresh data
    } catch (err) {
      console.error("Approve error:", err);
      alert(`❌ Error: ${err.message}`);
      // Or use toast: toast.error(`Error: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <tr>
      {/* Email */}
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-nowrap">{request.email}</p>
      </td>

      {/* Status */}
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            request.status?.toLowerCase() === "approved"
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {request.status || "pending"}
        </span>
      </td>

      {/* Action */}
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        {request.status?.toLowerCase() !== "approved" ? (
          <button
            onClick={handleApprove}
            disabled={isLoading}
            className={`relative inline-block px-4 py-2 font-semibold leading-tight rounded-lg transition-all ${
              isLoading
                ? "text-gray-500 bg-gray-200 cursor-not-allowed"
                : "text-white bg-green-600 hover:bg-green-700 cursor-pointer"
            }`}
          >
            {isLoading ? "Processing..." : "Approve"}
          </button>
        ) : (
          <span className="text-green-600 font-semibold">✓ Approved</span>
        )}
      </td>
    </tr>
  );
};

export default TutorRequestDataRow;
