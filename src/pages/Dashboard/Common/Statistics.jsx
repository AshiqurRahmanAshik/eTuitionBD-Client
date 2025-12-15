import AdminStatistics from "../../../components/Dashboard/Statistics/AdminStatistics";
import StudentStatistics from "../../../components/Dashboard/Statistics/StudentStatistics";
import TutorStatistics from "../../../components/Dashboard/Statistics/TutorStatistics";
import useRole from "../../../hooks/useRole";
import LoadingSpinner from "./../../../components/Shared/LoadingSpinner";

const Statistics = () => {
  const [role, isRoleLoading] = useRole();

  console.log("Statistics Debug:");
  console.log("Role:", role);
  console.log("Loading:", isRoleLoading);

  if (isRoleLoading) {
    return <LoadingSpinner />;
  }

  // Case-insensitive comparison ✅
  const normalizedRole = role?.toLowerCase();

  return (
    <div>
      {normalizedRole === "admin" && <AdminStatistics />}
      {normalizedRole === "student" && <StudentStatistics />}
      {normalizedRole === "tutor" && <TutorStatistics />}
    </div>
  );
};

export default Statistics;
