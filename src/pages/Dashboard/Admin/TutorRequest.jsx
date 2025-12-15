import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import TutorRequestDataRow from "../../../components/Dashboard/TableRows/TutorRequestDataRow";

const TutorRequest = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const isAdmin = user?.role?.toLowerCase() === "admin";

  const {
    data: tutorRequests = [],
    isLoading: requestsLoading,
    refetch,
  } = useQuery({
    queryKey: ["tutorRequests", user?.email],
    enabled: !!user && isAdmin,
    queryFn: async () => {
      const res = await axiosSecure.get("/tutor-requests");
      return res.data;
    },
  });

  // Auth loading state
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-gray-600">
        Checking authentication...
      </div>
    );
  }

  // Not admin
  if (!isAdmin) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-xl font-semibold text-center text-gray-700">
          You are not authorized to view this page.
        </h2>
      </div>
    );
  }

  // Loading tutor requests
  if (requestsLoading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-gray-600">
        Loading tutor requests...
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-8 py-8">
      <div className="mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          Manage Tutor Requests
        </h2>
        <p className="text-gray-600 mt-1">
          Total Requests: {tutorRequests.length}
        </p>
      </div>

      <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 bg-gray-100 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                  Email
                </th>
                <th className="px-5 py-3 bg-gray-100 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                  Status
                </th>
                <th className="px-5 py-3 bg-gray-100 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {tutorRequests.length > 0 ? (
                tutorRequests.map((request) => (
                  <TutorRequestDataRow
                    key={request._id || request.email}
                    request={request}
                    refetch={refetch}
                  />
                ))
              ) : (
                <tr>
                  <td
                    colSpan={3}
                    className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center text-gray-500"
                  >
                    No pending tutor requests found.
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

export default TutorRequest;
