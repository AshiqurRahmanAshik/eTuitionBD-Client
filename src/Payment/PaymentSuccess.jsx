import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { IoBagCheckOutline } from "react-icons/io5";
import { useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure"; // Adjust the path according to your project structure
import LoadingSpinner from './../components/Shared/LoadingSpinner';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const processPayment = async () => {
      if (!sessionId) {
        setError("Session ID not found");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        // Send payment success request to backend
        const response = await axiosSecure.post("/payment-success", {
          sessionId,
        });

        console.log("✅ Payment processed successfully:", response.data);

        // Invalidate all relevant queries to refresh data
        queryClient.invalidateQueries({ queryKey: ["myApplications"] });
        queryClient.invalidateQueries({ queryKey: ["myTuitions"] });
        queryClient.invalidateQueries({ queryKey: ["tutorOngoingTuitions"] });
        queryClient.invalidateQueries({ queryKey: ["myPayments"] });
        queryClient.invalidateQueries({ queryKey: ["tutorRevenue"] });
        queryClient.invalidateQueries({ queryKey: ["adminStatistics"] });

        setLoading(false);
      } catch (err) {
        console.error("❌ Payment processing error:", err);
        setError(err.response?.data?.message || "Failed to process payment");
        setLoading(false);
      }
    };

    processPayment();
  }, [sessionId, axiosSecure, queryClient]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="bg-white p-10 rounded-lg shadow-lg text-center max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-500 text-3xl">✕</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Payment Error
          </h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link
            to="/dashboard/my-tuitions"
            className="inline-block bg-red-500 text-white font-semibold py-2 px-6 rounded hover:bg-red-600 transition duration-300"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="bg-white p-10 rounded-lg shadow-lg text-center max-w-md">
        <IoBagCheckOutline className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Payment Successful!
        </h1>
        <p className="text-gray-600 mb-6">
          Thank you for your payment. The tutor has been notified and your
          tuition is now confirmed.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            to="/dashboard/my-tuitions"
            className="inline-block bg-lime-500 text-white font-semibold py-2 px-6 rounded hover:bg-lime-600 transition duration-300"
          >
            View My Tuitions
          </Link>
          <Link
            to="/"
            className="inline-block bg-gray-500 text-white font-semibold py-2 px-6 rounded hover:bg-gray-600 transition duration-300"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
