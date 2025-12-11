import { useQuery } from "@tanstack/react-query";
import CustomerOrderDataRow from "../../../components/Dashboard/TableRows/CustomerOrderDataRow";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

const MyOrders = () => {
  const { user } = useAuth();

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["orders", user?.email],
    queryFn: async () => {
      const result = await axios.get(
        `${import.meta.env.VITE_API_URL}/my-orders/${user?.email}`
      );
      return result.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  if (orders.length === 0)
    return (
      <p className="text-center mt-10 text-gray-500">You have no orders yet.</p>
    );

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                    Subject
                  </th>
                  <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                    Medium
                  </th>
                  <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                    Price
                  </th>
                  <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                    Location
                  </th>
                  <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                    Status
                  </th>
                  <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <CustomerOrderDataRow key={order._id} order={order} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
