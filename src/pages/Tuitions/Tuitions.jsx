import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaSearch, FaFilter } from "react-icons/fa";
import Container from "../../components/Shared/Container";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import Card from "../../components/Home/Card";

const Tuitions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    subject: "",
    class: "",
    location: "",
    sort: "date-desc",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const limit = 9;

  // Fetch tuitions with pagination and filters
  const { data, isLoading, error } = useQuery({
    queryKey: ["tuitions", currentPage, searchTerm, filters],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: currentPage,
        limit: limit,
        search: searchTerm,
        ...filters,
      });

      const result = await axios(
        `${import.meta.env.VITE_API_URL}/tuitions/paginated?${params}`
      );
      return result.data;
    },
  });

  const { tuitions = [], totalPages = 1, totalTuitions = 0 } = data || {};

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const clearFilters = () => {
    setSearchTerm("");
    setFilters({
      subject: "",
      class: "",
      location: "",
      sort: "date-desc",
    });
    setCurrentPage(1);
  };

 // if (isLoading) return <LoadingSpinner />;

  if (error) {
    return (
      <Container>
        <div className="pt-12 text-center text-red-500">
          <p className="text-xl font-semibold mb-2">Error loading tuitions</p>
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
            Browse Tuitions
          </h1>
          <p className="text-gray-600 text-lg">
            Find the perfect tuition opportunity
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
                  placeholder="Search by subject or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition"
                />
              </div>
              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition shadow-lg"
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
                    className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition"
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
                    Class
                  </label>
                  <select
                    value={filters.class}
                    onChange={(e) =>
                      handleFilterChange("class", e.target.value)
                    }
                    className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition"
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
                    className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition"
                  />
                </div>

                {/* Sort Filter */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Sort By
                  </label>
                  <select
                    value={filters.sort}
                    onChange={(e) => handleFilterChange("sort", e.target.value)}
                    className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition"
                  >
                    <option value="date-desc">Newest First</option>
                    <option value="date-asc">Oldest First</option>
                    <option value="budget-desc">Highest Budget</option>
                    <option value="budget-asc">Lowest Budget</option>
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
            <span className="font-semibold text-blue-600">
              {tuitions.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-blue-600">{totalTuitions}</span>{" "}
            tuitions
          </p>
          {currentPage > 1 && (
            <p className="text-sm text-gray-500">
              Page {currentPage} of {totalPages}
            </p>
          )}
        </div>

        {/* Tuitions Grid */}
        {tuitions.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-lg">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              No tuitions found
            </h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search or filters
            </p>
            <button
              onClick={clearFilters}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {tuitions.map((tuition) => (
                <Card key={tuition._id} tuition={tuition} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 flex-wrap">
                {/* Previous Button */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-5 py-2.5 border-2 border-gray-300 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition"
                >
                  ← Previous
                </button>

                {/* Page Numbers */}
                {[...Array(totalPages)].map((_, index) => {
                  const pageNum = index + 1;
                  // Show first page, last page, current page, and pages around current
                  if (
                    pageNum === 1 ||
                    pageNum === totalPages ||
                    (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`px-4 py-2.5 rounded-lg font-semibold transition ${
                          currentPage === pageNum
                            ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                            : "border-2 border-gray-300 hover:bg-gray-100"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  } else if (
                    pageNum === currentPage - 2 ||
                    pageNum === currentPage + 2
                  ) {
                    return (
                      <span key={pageNum} className="px-2 text-gray-400">
                        ...
                      </span>
                    );
                  }
                  return null;
                })}

                {/* Next Button */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-5 py-2.5 border-2 border-gray-300 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition"
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </Container>
    </div>
  );
};

export default Tuitions;
