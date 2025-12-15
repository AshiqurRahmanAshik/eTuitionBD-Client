import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import UserDataRow from "../../../components/Dashboard/TableRows/UserDataRow";

const ManageUsers = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const isAdmin = user?.role?.toLowerCase() === "admin";

  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    enabled: isAdmin,
    queryFn: async () => {
      try {
        const res = await axiosSecure.get("/users");
        return res.data;
      } catch (err) {
        console.error("Failed to fetch users:", err);
        return [];
      }
    },
  });

  if (!isAdmin) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-xl font-semibold text-center text-gray-700">
          You are not authorized to view this page.
        </h2>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-gray-600">
        Loading users...
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-8 py-8">
      <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                  Email
                </th>
                <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                  Role
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
              {users.length > 0 ? (
                users.map((user) => (
                  <UserDataRow key={user._id} user={user} refetch={refetch} />
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center text-gray-500"
                  >
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
