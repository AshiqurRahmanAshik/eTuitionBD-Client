import AdminStatistics from "../../../components/Dashboard/Statistics/AdminStatistics";
import StudentStatistics from "../../../components/Dashboard/Statistics/StudentStatistics";
import TutorStatistics from "../../../components/Dashboard/Statistics/TutorStatistics";
import useRole from "../../../hooks/useRole";
import LoadingSpinner from "./../../../components/Shared/LoadingSpinner";
const Statistics = () => {
  const [role, isRoleLoading] = useRole();
  if (isRoleLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      {role === "Admin" && <AdminStatistics />}
      {role === "Student" && <StudentStatistics />}
      {role === "Tutor" && <TutorStatistics />}
    </div>
  );
};

export default Statistics;
