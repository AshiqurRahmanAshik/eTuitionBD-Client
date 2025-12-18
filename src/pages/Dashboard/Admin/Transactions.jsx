import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

const Transactions = () => {
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: transactions = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["adminTransactions"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/transactions");
      console.log("🔍 Raw transactions data:", res.data);
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
          <p className="text-red-600">Failed to load transactions</p>
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

  // Helper function to safely get amount as number
  const getAmount = (transaction) => {
    const amount = transaction.amount;
    // Check if it's a valid number
    if (typeof amount === "number" && !isNaN(amount)) {
      return amount;
    }
    // Try to parse if it's a string
    if (typeof amount === "string") {
      const parsed = parseFloat(amount);
      return isNaN(parsed) ? 0 : parsed;
    }
    // Default to 0
    return 0;
  };

  // Filter transactions based on search
  const filteredTransactions = transactions.filter((transaction) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      transaction.studentEmail?.toLowerCase().includes(searchLower) ||
      transaction.tutorEmail?.toLowerCase().includes(searchLower) ||
      transaction.student?.name?.toLowerCase().includes(searchLower) ||
      transaction.tutor?.name?.toLowerCase().includes(searchLower) ||
      transaction.tuition?.subject?.toLowerCase().includes(searchLower) ||
      transaction.transactionId?.toLowerCase().includes(searchLower)
    );
  });

  const totalRevenue = transactions.reduce((sum, t) => sum + getAmount(t), 0);

  const filteredRevenue = filteredTransactions.reduce(
    (sum, t) => sum + getAmount(t),
    0
  );

  // Debug logging
  console.log("💰 Total Revenue:", totalRevenue);
  console.log("📊 Transactions:", transactions.length);
  if (transactions.length > 0) {
    console.log("📝 First transaction:", transactions[0]);
    console.log("💵 First transaction amount:", getAmount(transactions[0]));
  }

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
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-purple-100 mb-2">Platform Total Revenue</p>
            <p className="text-4xl font-bold">
              ৳{totalRevenue.toLocaleString()}
            </p>
            <p className="text-purple-100 mt-2">
              From {transactions.length}{" "}
              {transactions.length === 1 ? "transaction" : "transactions"}
            </p>
          </div>
          <div className="mt-4 md:mt-0 bg-white/20 backdrop-blur-sm rounded-lg p-4">
            <div className="text-center">
              <p className="text-purple-100 text-sm">Average Transaction</p>
              <p className="text-2xl font-bold mt-1">
                ৳
                {transactions.length > 0
                  ? Math.round(
                      totalRevenue / transactions.length
                    ).toLocaleString()
                  : 0}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      {transactions.length > 0 && (
        <div className="mb-6 bg-white rounded-lg shadow-md p-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <input
              type="text"
              placeholder="Search by student, tutor, subject, or transaction ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {searchTerm && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">
                  Found {filteredTransactions.length} of {transactions.length}{" "}
                  transactions
                </span>
                <button
                  onClick={() => setSearchTerm("")}
                  className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded-lg"
                >
                  Clear
                </button>
              </div>
            )}
          </div>
          {searchTerm && (
            <div className="mt-2 text-sm text-gray-600">
              Revenue from filtered: ৳{filteredRevenue.toLocaleString()}
            </div>
          )}
        </div>
      )}

      {/* Transactions Table */}
      {filteredTransactions.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <div className="text-gray-400 text-6xl mb-4">📄</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            {searchTerm ? "No matching transactions" : "No transactions yet"}
          </h3>
          <p className="text-gray-600">
            {searchTerm
              ? "Try adjusting your search criteria"
              : "Transactions will appear here once payments are made"}
          </p>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="mt-4 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
            >
              Clear Search
            </button>
          )}
        </div>
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="hidden lg:block bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Student
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tutor
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tuition
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Transaction ID
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {filteredTransactions.map((transaction) => {
                    const amount = getAmount(transaction);
                    const paidDate = transaction.paidAt
                      ? new Date(transaction.paidAt)
                      : null;
                    const isValidDate = paidDate && !isNaN(paidDate.getTime());

                    return (
                      <tr key={transaction._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {isValidDate
                            ? paidDate.toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              })
                            : "N/A"}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          <div>
                            <p className="font-medium">
                              {transaction.student?.name || "N/A"}
                            </p>
                            <p className="text-gray-500 text-xs">
                              {transaction.studentEmail || "N/A"}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          <div>
                            <p className="font-medium">
                              {transaction.tutor?.name || "N/A"}
                            </p>
                            <p className="text-gray-500 text-xs">
                              {transaction.tutorEmail || "N/A"}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          <div>
                            <p className="font-medium">
                              {transaction.tuition?.subject || "N/A"}
                            </p>
                            <p className="text-gray-500 text-xs">
                              Class {transaction.tuition?.class || "N/A"}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-lg font-semibold text-green-600">
                          ৳{amount.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                            {transaction.transactionId
                              ? `${transaction.transactionId.substring(
                                  0,
                                  20
                                )}...`
                              : "N/A"}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Card View */}
          <div className="lg:hidden space-y-4">
            {filteredTransactions.map((transaction) => {
              const amount = getAmount(transaction);
              const paidDate = transaction.paidAt
                ? new Date(transaction.paidAt)
                : null;
              const isValidDate = paidDate && !isNaN(paidDate.getTime());

              return (
                <div
                  key={transaction._id}
                  className="bg-white rounded-lg shadow-md p-4"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="font-semibold text-gray-900">
                        {transaction.tuition?.subject || "N/A"}
                      </p>
                      <p className="text-sm text-gray-500">
                        Class {transaction.tuition?.class || "N/A"}
                      </p>
                    </div>
                    <span className="text-lg font-bold text-green-600">
                      ৳{amount.toLocaleString()}
                    </span>
                  </div>

                  <div className="space-y-2 text-sm border-t pt-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date:</span>
                      <span className="text-gray-900">
                        {isValidDate
                          ? paidDate.toLocaleDateString("en-GB")
                          : "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Student:</span>
                      <span className="text-gray-900 font-medium">
                        {transaction.student?.name || "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tutor:</span>
                      <span className="text-gray-900 font-medium">
                        {transaction.tutor?.name || "N/A"}
                      </span>
                    </div>
                    <div className="pt-2 border-t">
                      <p className="text-xs text-gray-500 font-mono break-all">
                        ID: {transaction.transactionId || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* Summary Footer */}
      {filteredTransactions.length > 0 && (
        <div className="mt-6 bg-gray-50 rounded-lg p-4 border border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-gray-600 text-sm">Total Transactions</p>
              <p className="text-xl font-semibold text-gray-900">
                {filteredTransactions.length}
              </p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Total Revenue</p>
              <p className="text-xl font-semibold text-green-600">
                ৳{filteredRevenue.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Average Amount</p>
              <p className="text-xl font-semibold text-gray-900">
                ৳
                {filteredTransactions.length > 0
                  ? Math.round(
                      filteredRevenue / filteredTransactions.length
                    ).toLocaleString()
                  : 0}
              </p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Latest Transaction</p>
              <p className="text-xl font-semibold text-gray-900">
                {filteredTransactions[0]?.paidAt &&
                !isNaN(new Date(filteredTransactions[0].paidAt).getTime())
                  ? new Date(filteredTransactions[0].paidAt).toLocaleDateString(
                      "en-GB",
                      {
                        day: "2-digit",
                        month: "short",
                      }
                    )
                  : "N/A"}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transactions;
