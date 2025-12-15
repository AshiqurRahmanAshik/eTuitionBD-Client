import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

const Transactions = () => {
  const axiosSecure = useAxiosSecure();

  const { data: transactions = [], isLoading } = useQuery({
    queryKey: ["adminTransactions"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/transactions");
      return res.data;
    },
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const totalRevenue = transactions.reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          All Transactions
        </h2>
        <p className="text-gray-600 mt-1">
          Complete payment history and revenue tracking
        </p>
      </div>

      {/* Total Revenue Card */}
      <div className="bg-linear-to-r from-purple-500 to-purple-600 text-white rounded-lg shadow-md p-6 mb-6">
        <p className="text-purple-100 mb-2">Platform Total Revenue</p>
        <p className="text-4xl font-bold">৳{totalRevenue.toLocaleString()}</p>
        <p className="text-purple-100 mt-2">
          From {transactions.length} transactions
        </p>
      </div>

      {/* Transactions Table */}
      {transactions.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <p className="text-gray-600">No transactions yet</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Student
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Tutor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Tuition
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Transaction ID
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {transactions.map((transaction) => (
                  <tr key={transaction._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(transaction.paidAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <div>
                        <p className="font-medium">
                          {transaction.student?.name || "N/A"}
                        </p>
                        <p className="text-gray-500 text-xs">
                          {transaction.studentEmail}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <div>
                        <p className="font-medium">
                          {transaction.tutor?.name || "N/A"}
                        </p>
                        <p className="text-gray-500 text-xs">
                          {transaction.tutorEmail}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {transaction.tuition?.subject} - Class{" "}
                      {transaction.tuition?.class}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
                      ৳{transaction.amount?.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      <span className="font-mono text-xs">
                        {transaction.transactionId?.substring(0, 20)}...
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transactions;
