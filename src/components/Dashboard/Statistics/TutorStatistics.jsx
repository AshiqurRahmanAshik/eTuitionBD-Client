import { useQuery } from "@tanstack/react-query";
import {
  FaClipboardCheck,
  FaChalkboardTeacher,
  FaMoneyBillWave,
} from "react-icons/fa";
import { MdPending } from "react-icons/md";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../Shared/LoadingSpinner";

const TutorStatistics = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch tutor's applications
  const { data: applications = [], isLoading: appsLoading } = useQuery({
    queryKey: ["myApplications"],
    queryFn: async () => {
      const res = await axiosSecure.get("/my-applications");
      return res.data;
    },
  });

  // Fetch tutor's ongoing tuitions
  const { data: ongoingTuitions = [], isLoading: tuitionsLoading } = useQuery({
    queryKey: ["tutorOngoingTuitions"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tutor-ongoing-tuitions");
      return res.data;
    },
  });

  // Fetch tutor's revenue
  const { data: revenueData, isLoading: revenueLoading } = useQuery({
    queryKey: ["tutorRevenue"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tutor-revenue");
      return res.data;
    },
  });

  if (appsLoading || tuitionsLoading || revenueLoading) {
    return <LoadingSpinner />;
  }

  // Filter application statuses
  const pendingApps = applications.filter(
    (app) => app.status === "pending"
  ).length;

  const approvedApps = applications.filter(
    (app) => app.status === "approved"
  ).length;

  const rejectedApps = applications.filter(
    (app) => app.status === "rejected"
  ).length;

  // Get revenue data
  const totalRevenue = revenueData?.totalRevenue || 0;
  const recentTransactions = revenueData?.revenue || [];

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Tutor Dashboard
        </h2>
        <p className="text-gray-600 mt-1">
          Track your applications, ongoing tuitions, and earnings
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {/* Total Applications */}
        <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
          <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-blue-600 to-blue-400 text-white shadow-blue-500/40">
            <FaClipboardCheck className="w-6 h-6 text-white" />
          </div>
          <div className="p-4 text-right">
            <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
              Total Applications
            </p>
            <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
              {applications.length}
            </h4>
          </div>
        </div>

        {/* Pending Applications */}
        <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
          <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-yellow-600 to-yellow-400 text-white shadow-yellow-500/40">
            <MdPending className="w-6 h-6 text-white" />
          </div>
          <div className="p-4 text-right">
            <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
              Pending Review
            </p>
            <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
              {pendingApps}
            </h4>
          </div>
        </div>

        {/* Ongoing Tuitions */}
        <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
          <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-green-600 to-green-400 text-white shadow-green-500/40">
            <FaChalkboardTeacher className="w-6 h-6 text-white" />
          </div>
          <div className="p-4 text-right">
            <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
              Ongoing Tuitions
            </p>
            <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
              {ongoingTuitions.length}
            </h4>
          </div>
        </div>

        {/* Total Earnings */}
        <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
          <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-orange-600 to-orange-400 text-white shadow-orange-500/40">
            <FaMoneyBillWave className="w-6 h-6 text-white" />
          </div>
          <div className="p-4 text-right">
            <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
              Total Earnings
            </p>
            <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
              ৳{totalRevenue.toLocaleString()}
            </h4>
          </div>
        </div>
      </div>

      {/* Application Status & Recent Earnings */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        {/* Application Status */}
        <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Application Status
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Pending</span>
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold">
                {pendingApps}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Approved</span>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                {approvedApps}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Rejected</span>
              <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-semibold">
                {rejectedApps}
              </span>
            </div>
          </div>
        </div>

        {/* Recent Earnings */}
        <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md p-6 lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Recent Earnings
          </h3>
          {recentTransactions.length > 0 ? (
            <div className="space-y-3">
              {recentTransactions.slice(0, 5).map((txn) => (
                <div
                  key={txn._id}
                  className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {txn.tuition?.subject || "N/A"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(txn.paidAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <span className="text-lg font-semibold text-green-600">
                    ৳{txn.amount?.toLocaleString() || 0}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-400 text-sm">No earnings yet</p>
              <p className="text-gray-500 text-xs mt-1">
                Start applying to tuitions to earn money
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Stats Summary */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-blue-100 text-sm">Success Rate</p>
            <p className="text-2xl font-bold mt-1">
              {applications.length > 0
                ? Math.round((approvedApps / applications.length) * 100)
                : 0}
              %
            </p>
          </div>
          <div className="text-center">
            <p className="text-blue-100 text-sm">Active Now</p>
            <p className="text-2xl font-bold mt-1">{ongoingTuitions.length}</p>
          </div>
          <div className="text-center">
            <p className="text-blue-100 text-sm">Total Earned</p>
            <p className="text-2xl font-bold mt-1">
              ৳{(totalRevenue / 1000).toFixed(1)}k
            </p>
          </div>
          <div className="text-center">
            <p className="text-blue-100 text-sm">Avg. Per Tuition</p>
            <p className="text-2xl font-bold mt-1">
              ৳
              {recentTransactions.length > 0
                ? Math.round(
                    totalRevenue / recentTransactions.length
                  ).toLocaleString()
                : 0}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorStatistics;
