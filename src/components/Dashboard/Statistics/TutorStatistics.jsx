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

  const pendingApps = applications.filter(
    (app) => app.status === "pending"
  ).length;
  const approvedApps = applications.filter(
    (app) => app.status === "approved"
  ).length;
  const rejectedApps = applications.filter(
    (app) => app.status === "rejected"
  ).length;
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
          <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-linear-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-blue-600 to-blue-400 text-white shadow-blue-500/40">
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
          <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-linear-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-yellow-600 to-yellow-400 text-white shadow-yellow-500/40">
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
          <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-linear-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-green-600 to-green-400 text-white shadow-green-500/40">
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
          <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-linear-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-orange-600 to-orange-400 text-white shadow-orange-500/40">
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

      {/* Details */}
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
        <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Recent Earnings
          </h3>
          {recentTransactions.length > 0 ? (
            <div className="space-y-2">
              {recentTransactions.slice(0, 3).map((transaction) => (
                <div
                  key={transaction._id}
                  className="flex justify-between items-center text-sm"
                >
                  <span className="text-gray-600">
                    {new Date(transaction.paidAt).toLocaleDateString()}
                  </span>
                  <span className="font-semibold text-green-600">
                    ৳{transaction.amount.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No earnings yet</p>
          )}
        </div>

        {/* Quick Actions */}
        <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Quick Actions
          </h3>
          <div className="space-y-2">
            <a
              href="/tuitions"
              className="block px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-colors text-center"
            >
              Browse Tuitions
            </a>
            <a
              href="/dashboard/my-applications"
              className="block px-4 py-2 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg transition-colors text-center"
            >
              My Applications
            </a>
            <a
              href="/dashboard/revenue"
              className="block px-4 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-lg transition-colors text-center"
            >
              Revenue History
            </a>
          </div>
        </div>
      </div>

      {/* Ongoing Tuitions List */}
      {ongoingTuitions.length > 0 && (
        <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Current Tuitions
          </h3>
          <div className="space-y-3">
            {ongoingTuitions.slice(0, 5).map((tuition) => (
              <div
                key={tuition._id}
                className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  <h4 className="font-semibold text-gray-800">
                    {tuition.subject} - Class {tuition.class}
                  </h4>
                  <p className="text-sm text-gray-600">{tuition.location}</p>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                  Active
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Info Banner */}
      <div className="relative flex flex-col bg-clip-border rounded-xl bg-linear-to-r from-blue-500 to-blue-600 text-white shadow-md p-8">
        <h3 className="text-2xl font-bold mb-2">Keep Growing Your Career!</h3>
        <p className="text-blue-100 mb-4">
          Apply to new tuition opportunities and increase your earnings
        </p>
        <a
          href="/tuitions"
          className="inline-block px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors w-fit"
        >
          Browse Available Tuitions
        </a>
      </div>
    </div>
  );
};

export default TutorStatistics;
