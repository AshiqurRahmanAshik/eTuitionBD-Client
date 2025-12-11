import Card from "./Card";
import Container from "../Shared/Container";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "./../Shared/LoadingSpinner";

const Tuitions = () => {
  const {
    data: tuitions = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tuitions"],
    queryFn: async () => {
      const result = await axios(`${import.meta.env.VITE_API_URL}/tuitions`);
      return result.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  if (error) {
    return (
      <Container>
        <div className="pt-12 text-center text-red-500">
          Error loading tuitions: {error.message}
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="pt-12">
        {tuitions && tuitions.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {tuitions.map((tuition) => (
              <Card key={tuition._id} tuition={tuition} />
            ))}
          </div>
        ) : (
          <div className="text-center text-xl text-gray-500">
            <p>No tuitions available at the moment</p>
            <p className="text-sm mt-2">
              Check back later for new tuition posts
            </p>
          </div>
        )}
      </div>
    </Container>
  );
};

export default Tuitions;
