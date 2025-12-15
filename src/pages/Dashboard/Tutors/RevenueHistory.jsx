import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

const RevenueHistory = () => {
  const axiosSecure = useAxiosSecure();

  const { data: revenueData, isLoading } = useQuery({
    queryKey: ["tutorRevenue"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tutor-revenue");
      return res.data;
    },
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const { revenue = [], totalRevenue = 0 } = revenueData || {};

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Revenue History
        </h2>
        <p className="text-gray-600 mt-1">
          Track your earnings from tuition services
        </p>
      </div>

      {/* Total Earnings Card */}
      <div className="bg-linear-to-r from-green-500 to-green-600 text-white rounded-lg shadow-md p-6 mb-6">
        <p className="text-green-100 mb-2">Total Earnings</p>
        <p className="text-4xl font-bold">৳{totalRevenue.toLocaleString()}</p>
        <p className="text-green-100 mt-2">From {revenue.length} tuitions</p>
      </div>

      {/* Revenue List */}
      {revenue.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <div className="text-gray-400 text-6xl mb-4">💰</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            No Earnings Yet
          </h3>
          <p className="text-gray-600">
            Your earnings will appear here once you're hired
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Tuition Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {revenue.map((payment) => (
                <tr key={payment._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(payment.paidAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    Subject: {payment.tuition?.subject || "N/A"}
                    <br />
                    <span className="text-gray-500 text-xs">
                      Class {payment.tuition?.class}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {payment.studentEmail}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-lg font-semibold text-green-600">
                    ৳{payment.amount?.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      Received
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RevenueHistory;
