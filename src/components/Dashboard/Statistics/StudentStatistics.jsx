import { useQuery } from "@tanstack/react-query";
import { FaClipboardList, FaUserTie, FaMoneyBillWave } from "react-icons/fa";
import { MdPostAdd } from "react-icons/md";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../Shared/LoadingSpinner";

const StudentStatistics = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch student's tuitions
  const { data: tuitions = [], isLoading: tuitionsLoading } = useQuery({
    queryKey: ["myTuitions"],
    queryFn: async () => {
      const res = await axiosSecure.get("/my-tuitions");
      return res.data;
    },
  });

  // Fetch student's payments
  const { data: payments = [], isLoading: paymentsLoading } = useQuery({
    queryKey: ["myPayments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/my-payments");
      return res.data;
    },
  });

  if (tuitionsLoading || paymentsLoading) {
    return <LoadingSpinner />;
  }

  const pendingTuitions = tuitions.filter((t) => t.status === "pending").length;
  const approvedTuitions = tuitions.filter(
    (t) => t.status === "approved"
  ).length;
  const hiredTuitions = tuitions.filter((t) => t.status === "hired").length;
  const totalSpent = payments.reduce((sum, payment) => sum + payment.amount, 0);

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Student Dashboard
        </h2>
        <p className="text-gray-600 mt-1">
          Manage your tuition posts and track applications
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {/* Total Tuitions */}
        <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
          <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-linear-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-blue-600 to-blue-400 text-white shadow-blue-500/40">
            <FaClipboardList className="w-6 h-6 text-white" />
          </div>
          <div className="p-4 text-right">
            <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
              Total Tuitions
            </p>
            <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
              {tuitions.length}
            </h4>
          </div>
        </div>

        {/* Pending Approvals */}
        <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
          <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-linear-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-yellow-600 to-yellow-400 text-white shadow-yellow-500/40">
            <MdPostAdd className="w-6 h-6 text-white" />
          </div>
          <div className="p-4 text-right">
            <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
              Pending Approval
            </p>
            <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
              {pendingTuitions}
            </h4>
          </div>
        </div>

        {/* Hired Tutors */}
        <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
          <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-linear-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-green-600 to-green-400 text-white shadow-green-500/40">
            <FaUserTie className="w-6 h-6 text-white" />
          </div>
          <div className="p-4 text-right">
            <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
              Hired Tutors
            </p>
            <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
              {hiredTuitions}
            </h4>
          </div>
        </div>

        {/* Total Spent */}
        <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
          <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-linear-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-orange-600 to-orange-400 text-white shadow-orange-500/40">
            <FaMoneyBillWave className="w-6 h-6 text-white" />
          </div>
          <div className="p-4 text-right">
            <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
              Total Spent
            </p>
            <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
              ৳{totalSpent.toLocaleString()}
            </h4>
          </div>
        </div>
      </div>

      {/* Status Breakdown */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        {/* Tuition Status */}
        <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Tuition Status
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Pending</span>
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold">
                {pendingTuitions}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Approved</span>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                {approvedTuitions}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Hired</span>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                {hiredTuitions}
              </span>
            </div>
          </div>
        </div>

        {/* Recent Payments */}
        <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Recent Payments
          </h3>
          {payments.length > 0 ? (
            <div className="space-y-2">
              {payments.slice(0, 3).map((payment) => (
                <div
                  key={payment._id}
                  className="flex justify-between items-center text-sm"
                >
                  <span className="text-gray-600 truncate">
                    {payment.tuition?.subject || "N/A"}
                  </span>
                  <span className="font-semibold text-green-600">
                    ৳{payment.amount}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No payments yet</p>
          )}
        </div>

        {/* Quick Actions */}
        <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Quick Actions
          </h3>
          <div className="space-y-2">
            <a
              href="/dashboard/post-tuition"
              className="block px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-colors text-center"
            >
              Post New Tuition
            </a>
            <a
              href="/dashboard/my-tuitions"
              className="block px-4 py-2 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg transition-colors text-center"
            >
              My Tuitions
            </a>
            <a
              href="/dashboard/payments"
              className="block px-4 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-lg transition-colors text-center"
            >
              Payment History
            </a>
          </div>
        </div>
      </div>

      {/* Info Banner */}
      <div className="relative flex flex-col bg-clip-border rounded-xl bg-linear-to-r from-green-500 to-green-600 text-white shadow-md p-8">
        <h3 className="text-2xl font-bold mb-2">Need Help Finding a Tutor?</h3>
        <p className="text-green-100 mb-4">
          Post your tuition requirements and get applications from qualified
          tutors
        </p>
        <a
          href="/dashboard/post-tuition"
          className="inline-block px-6 py-3 bg-white text-green-600 font-semibold rounded-lg hover:bg-green-50 transition-colors w-fit"
        >
          Post Tuition Now
        </a>
      </div>
    </div>
  );
};

export default StudentStatistics;
