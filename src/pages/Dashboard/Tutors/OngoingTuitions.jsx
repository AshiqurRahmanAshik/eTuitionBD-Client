import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

const OngoingTuitions = () => {
  const axiosSecure = useAxiosSecure();

  const { data: tuitions = [], isLoading } = useQuery({
    queryKey: ["tutorOngoingTuitions"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tutor-ongoing-tuitions");
      return res.data;
    },
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Ongoing Tuitions
        </h2>
        <p className="text-gray-600 mt-1">
          Tuitions where you've been hired as a tutor
        </p>
      </div>

      {tuitions.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <div className="text-gray-400 text-6xl mb-4">📚</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            No Ongoing Tuitions
          </h3>
          <p className="text-gray-600">Apply to tuition posts to get hired</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {tuitions.map((tuition) => (
            <div
              key={tuition._id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {tuition.subject} - Class {tuition.class}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Student: {tuition.postedBy?.email}
                  </p>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                  Active
                </span>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600">Location</p>
                  <p className="font-medium text-gray-800">
                    {tuition.location}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Salary</p>
                  <p className="font-semibold text-green-600">
                    ৳{tuition.salary?.toLocaleString()}/month
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Classes/Week</p>
                  <p className="font-medium text-gray-800">{tuition.perWeek}</p>
                </div>
              </div>

              {tuition.additionalInfo && (
                <p className="text-sm text-gray-700 mb-4">
                  <span className="font-semibold">Additional Info:</span>{" "}
                  {tuition.additionalInfo}
                </p>
              )}

              <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  Hired: {new Date(tuition.hiredAt).toLocaleDateString()}
                </p>
                <span className="px-4 py-2 bg-blue-50 text-blue-700 font-semibold rounded-lg">
                  Contact Student
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OngoingTuitions;
