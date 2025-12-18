import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaSearch, FaFilter } from "react-icons/fa";
import Container from "../../components/Shared/Container";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import TutorCard from "../../components/Home/TutorCard";

const Tutors = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    subject: "",
    class: "",
    location: "",
    experience: "",
  });
  const [showFilters, setShowFilters] = useState(false);

  // Fetch all tutors from backend
  const {
    data: allTutors = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["allTutors"],
    queryFn: async () => {
      const result = await axios(`${import.meta.env.VITE_API_URL}/tutors`);
      return result.data;
    },
  });

  // Client-side filtering
  const filteredTutors = allTutors.filter((tutor) => {
    // Search filter
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      const matchesName = tutor.name?.toLowerCase().includes(search);
      const matchesSubject = tutor.subjects?.some((subject) =>
        subject.toLowerCase().includes(search)
      );
      const matchesLocation = tutor.preferredLocations?.some((loc) =>
        loc.toLowerCase().includes(search)
      );
      if (!matchesName && !matchesSubject && !matchesLocation) {
        return false;
      }
    }

    // Subject filter
    if (filters.subject) {
      if (!tutor.subjects?.includes(filters.subject)) {
        return false;
      }
    }

    // Class filter
    if (filters.class) {
      if (!tutor.classes?.includes(parseInt(filters.class))) {
        return false;
      }
    }

    // Location filter
    if (filters.location) {
      const hasLocation = tutor.preferredLocations?.some((loc) =>
        loc.toLowerCase().includes(filters.location.toLowerCase())
      );
      if (!hasLocation) {
        return false;
      }
    }

    // Experience filter
    if (filters.experience) {
      const expYears = parseInt(tutor.experience);
      if (filters.experience === "0-1" && expYears > 1) return false;
      if (filters.experience === "2-3" && (expYears < 2 || expYears > 3))
        return false;
      if (filters.experience === "4+" && expYears < 4) return false;
    }

    // Only show active tutors
    return tutor.status === "Active";
  });

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setSearchTerm("");
    setFilters({
      subject: "",
      class: "",
      location: "",
      experience: "",
    });
  };

  if (isLoading) return <LoadingSpinner />;

  if (error) {
    return (
      <Container>
        <div className="pt-12 text-center text-red-500">
          <p className="text-xl font-semibold mb-2">Error loading tutors</p>
          <p className="text-sm">{error.message}</p>
        </div>
      </Container>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Container>
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Our Expert Tutors
          </h1>
          <p className="text-gray-600 text-lg">
            Browse through our qualified and experienced tutors
          </p>
        </div>

        {/* Search & Filter Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="mb-4">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, subject or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition"
                />
              </div>
              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-blue-700 transition shadow-lg"
              >
                Search
              </button>
              <button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                className="px-6 py-3 border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition flex items-center gap-2"
              >
                <FaFilter />
                {showFilters ? "Hide" : "Show"} Filters
              </button>
            </div>
          </form>

          {/* Filters - Collapsible */}
          {showFilters && (
            <div className="space-y-4 pt-4 border-t-2 border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Subject Filter */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Subject
                  </label>
                  <select
                    value={filters.subject}
                    onChange={(e) =>
                      handleFilterChange("subject", e.target.value)
                    }
                    className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition"
                  >
                    <option value="">All Subjects</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Biology">Biology</option>
                    <option value="English">English</option>
                    <option value="ICT">ICT</option>
                    <option value="Bangla">Bangla</option>
                    <option value="Business Studies">Business Studies</option>
                    <option value="Accounting">Accounting</option>
                    <option value="Economics">Economics</option>
                  </select>
                </div>

                {/* Class Filter */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Teaching Class
                  </label>
                  <select
                    value={filters.class}
                    onChange={(e) =>
                      handleFilterChange("class", e.target.value)
                    }
                    className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition"
                  >
                    <option value="">All Classes</option>
                    {[...Array(12)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        Class {i + 1}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Location Filter */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Dhaka, Mirpur"
                    value={filters.location}
                    onChange={(e) =>
                      handleFilterChange("location", e.target.value)
                    }
                    className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition"
                  />
                </div>

                {/* Experience Filter */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Experience
                  </label>
                  <select
                    value={filters.experience}
                    onChange={(e) =>
                      handleFilterChange("experience", e.target.value)
                    }
                    className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition"
                  >
                    <option value="">All Experience</option>
                    <option value="0-1">0-1 years</option>
                    <option value="2-3">2-3 years</option>
                    <option value="4+">4+ years</option>
                  </select>
                </div>
              </div>

              {/* Clear Filters Button */}
              <div className="flex justify-end">
                <button
                  onClick={clearFilters}
                  className="px-6 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition font-semibold"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6 flex justify-between items-center">
          <p className="text-gray-600">
            Showing{" "}
            <span className="font-semibold text-purple-600">
              {filteredTutors.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-purple-600">
              {allTutors.length}
            </span>{" "}
            tutors
          </p>
          <div className="flex items-center gap-2">
            <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
              ✓ All Verified
            </span>
          </div>
        </div>

        {/* Tutors Grid */}
        {filteredTutors.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-lg">
            <div className="text-6xl mb-4">👨‍🏫</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              No tutors found
            </h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search or filters
            </p>
            <button
              onClick={clearFilters}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-semibold"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTutors.map((tutor) => (
              <TutorCard key={tutor._id} tutor={tutor} />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
};

export default Tutors;
