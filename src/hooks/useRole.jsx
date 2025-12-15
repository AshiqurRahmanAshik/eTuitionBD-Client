import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useRole = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: role, isLoading: isRoleLoading } = useQuery({
    enabled: !loading && !!user?.email,
    queryKey: ["role", user?.email],
    queryFn: async () => {
      console.log("🔍 Fetching role for:", user?.email);
      const result = await axiosSecure(`/user/role`);
      console.log("✅ Role API Response:", result.data);
      return result.data.role;
    },
  });

  console.log("useRole returning:", { role, isRoleLoading });

  return [role, isRoleLoading];
};

export default useRole;
