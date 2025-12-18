import { useQuery } from "@tanstack/react-query";
import { FaUserAlt, FaDollarSign } from "react-icons/fa";
import { BsFillCartPlusFill, BsFillHouseDoorFill } from "react-icons/bs";
import { HiDocumentReport } from "react-icons/hi";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../Shared/LoadingSpinner";
import { Link } from "react-router";

const AdminStatistics = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch admin statistics
  const {
    data: stats,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["adminStatistics"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/statistics");
      return res.data;
    },
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-600">Failed to load statistics</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Admin Dashboard
        </h2>
        <p className="text-gray-600 mt-1">
          Overview of platform statistics and performance
        </p>
      </div>

      <div className="mt-8">
        {/* Main Stats Cards */}
        <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Total Revenue Card */}
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
            <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-orange-600 to-orange-400 text-white shadow-orange-500/40">
              <FaDollarSign className="w-6 h-6 text-white" />
            </div>
            <div className="p-4 text-right">
              <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                Total Revenue
              </p>
              <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                ৳{stats?.totalRevenue?.toLocaleString() || 0}
              </h4>
            </div>
          </div>

          {/* Total Users Card */}
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
            <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-green-600 to-green-400 text-white shadow-green-500/40">
              <FaUserAlt className="w-6 h-6 text-white" />
            </div>
            <div className="p-4 text-right">
              <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                Total Users
              </p>
              <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                {stats?.totalUsers || 0}
              </h4>
            </div>
          </div>

          {/* Total Tuitions */}
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
            <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-pink-600 to-pink-400 text-white shadow-pink-500/40">
              <BsFillHouseDoorFill className="w-6 h-6 text-white" />
            </div>
            <div className="p-4 text-right">
              <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                Total Tuitions
              </p>
              <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                {stats?.totalTuitions || 0}
              </h4>
            </div>
          </div>

          {/* Total Applications */}
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
            <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-blue-600 to-blue-400 text-white shadow-blue-500/40">
              <BsFillCartPlusFill className="w-6 h-6 text-white" />
            </div>
            <div className="p-4 text-right">
              <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                Total Applications
              </p>
              <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                {stats?.totalApplications || 0}
              </h4>
            </div>
          </div>
        </div>

        {/* Secondary Stats */}
        <div className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Users by Role */}
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Users by Role
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Students</span>
                <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full font-semibold">
                  {stats?.usersByRole?.students || 0}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Tutors</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full font-semibold">
                  {stats?.usersByRole?.tutors || 0}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Admins</span>
                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full font-semibold">
                  {stats?.usersByRole?.admins || 0}
                </span>
              </div>
            </div>
          </div>

          {/* Tuitions by Status */}
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Tuitions by Status
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Pending</span>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full font-semibold">
                  {stats?.tuitionsByStatus?.pendingTuitions || 0}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Approved</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full font-semibold">
                  {stats?.tuitionsByStatus?.approvedTuitions || 0}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Hired</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full font-semibold">
                  {stats?.tuitionsByStatus?.hiredTuitions || 0}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Quick Actions
            </h3>
            <div className="space-y-2">
              <Link
                to="/dashboard/manage-users"
                className="block px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-colors text-center font-medium"
              >
                Manage Users
              </Link>
              <Link
                to="/dashboard/manage-tuitions"
                className="block px-4 py-2 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg transition-colors text-center font-medium"
              >
                Manage Tuitions
              </Link>
              <Link
                to="/dashboard/transactions"
                className="block px-4 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-lg transition-colors text-center font-medium"
              >
                View Transactions
              </Link>
            </div>
          </div>
        </div>

        {/* Platform Metrics Summary */}
        <div className="mb-8 grid gap-6 md:grid-cols-3">
          {/* Success Rate */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">
                  Application Success Rate
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {stats?.totalApplications > 0
                    ? Math.round(
                        (stats?.tuitionsByStatus?.hiredTuitions /
                          stats?.totalApplications) *
                          100
                      )
                    : 0}
                  %
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <HiDocumentReport className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          {/* Platform Activity */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Active Tuitions</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {(stats?.tuitionsByStatus?.approvedTuitions || 0) +
                    (stats?.tuitionsByStatus?.hiredTuitions || 0)}
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <BsFillHouseDoorFill className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Revenue per Transaction */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Avg. per Transaction</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  ৳
                  {stats?.tuitionsByStatus?.hiredTuitions > 0
                    ? Math.round(
                        stats?.totalRevenue /
                          stats?.tuitionsByStatus?.hiredTuitions
                      ).toLocaleString()
                    : 0}
                </p>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <FaDollarSign className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Revenue Info Card - FIXED */}
        <div className="relative flex flex-col bg-clip-border rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md p-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-2">Platform Revenue</h3>
              <p className="text-blue-100 mb-4">
                Total earnings from all completed transactions
              </p>
              <div className="text-5xl font-bold">
                ৳{stats?.totalRevenue?.toLocaleString() || 0}
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6">
                <div className="space-y-2">
                  <div className="flex justify-between gap-8">
                    <span className="text-blue-100">Completed:</span>
                    <span className="font-semibold">
                      {stats?.tuitionsByStatus?.hiredTuitions || 0}
                    </span>
                  </div>
                  <div className="flex justify-between gap-8">
                    <span className="text-blue-100">In Progress:</span>
                    <span className="font-semibold">
                      {stats?.tuitionsByStatus?.approvedTuitions || 0}
                    </span>
                  </div>
                  <div className="flex justify-between gap-8">
                    <span className="text-blue-100">Total Users:</span>
                    <span className="font-semibold">
                      {stats?.totalUsers || 0}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminStatistics;
