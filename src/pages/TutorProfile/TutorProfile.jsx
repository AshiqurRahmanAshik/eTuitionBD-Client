import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Container from "../../components/Shared/Container";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaUser,
  FaBook,
  FaGraduationCap,
  FaStar,
  FaBriefcase,
  FaCalendar,
  FaCheckCircle,
} from "react-icons/fa";

const TutorProfile = () => {
  const { email } = useParams(); // ✅ Changed from id to email
  const navigate = useNavigate();

  // Fetch tutor details by email
  const {
    data: tutor,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tutorProfile", email],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/tutors/${email}` // ✅ Using email
      );
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  if (error || !tutor) {
    return (
      <Container>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">❌</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Tutor Not Found
            </h2>
            <p className="text-gray-600 mb-4">
              Sorry, this tutor profile is not available.
            </p>
            <button
              onClick={() => navigate("/tutors")}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold"
            >
              View All Tutors
            </button>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-5xl mx-auto"
        >
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="mb-6 flex items-center gap-2 text-purple-600 hover:text-purple-800 font-semibold transition-colors"
          >
            ← Back
          </button>

          {/* Profile Header Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
            {/* Header Background */}
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 h-32"></div>

            <div className="px-8 pb-8">
              <div className="flex flex-col md:flex-row gap-6 -mt-16">
                {/* Profile Image */}
                <div className="relative">
                  <img
                    src={tutor.photoURL || "https://via.placeholder.com/200"}
                    alt={tutor.name}
                    className="w-32 h-32 rounded-2xl border-4 border-white shadow-xl object-cover"
                  />
                  {tutor.isVerified && (
                    <div className="absolute -bottom-2 -right-2 bg-green-500 text-white p-2 rounded-full shadow-lg">
                      <FaCheckCircle className="text-xl" />
                    </div>
                  )}
                </div>

                {/* Basic Info */}
                <div className="flex-1 mt-4 md:mt-0">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-800 mb-2">
                        {tutor.name}
                      </h1>
                      <p className="text-gray-600 mb-3">
                        {tutor.qualifications}
                      </p>

                      {/* Rating */}
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-lg border border-yellow-200">
                          <FaStar className="text-yellow-500" />
                          <span className="font-bold text-gray-800">
                            {tutor.rating || 0}
                          </span>
                          <span className="text-gray-600 text-sm">
                            ({tutor.totalReviews || 0} reviews)
                          </span>
                        </div>

                        <span
                          className={`px-4 py-2 rounded-lg font-semibold ${
                            tutor.status === "Active"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {tutor.status}
                        </span>
                      </div>
                    </div>

                    {/* Salary */}
                    <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white px-6 py-4 rounded-xl shadow-lg">
                      <p className="text-sm text-green-100 mb-1">
                        Expected Salary
                      </p>
                      <p className="text-3xl font-bold">
                        ৳{tutor.expectedSalary}
                      </p>
                      <p className="text-sm text-green-100">per month</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Experience */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <FaBriefcase className="text-purple-600 text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Experience</h3>
              </div>
              <p className="text-2xl font-bold text-purple-600">
                {tutor.experience}
              </p>
            </div>

            {/* Qualifications */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <FaGraduationCap className="text-blue-600 text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Education</h3>
              </div>
              <p className="text-gray-700">{tutor.qualifications}</p>
            </div>
          </div>

          {/* Subjects & Classes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Subjects */}
            {tutor.subjects && tutor.subjects.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <FaBook className="text-green-600 text-2xl" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">Subjects</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tutor.subjects.map((subject, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-green-50 text-green-700 rounded-lg font-semibold border border-green-200"
                    >
                      {subject}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Classes */}
            {tutor.classes && tutor.classes.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-indigo-100 rounded-lg">
                    <FaGraduationCap className="text-indigo-600 text-2xl" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">
                    Teaching Classes
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tutor.classes.map((cls, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg font-semibold border border-indigo-200"
                    >
                      Class {cls}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Locations */}
          {tutor.preferredLocations && tutor.preferredLocations.length > 0 && (
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-red-100 rounded-lg">
                  <FaMapMarkerAlt className="text-red-600 text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">
                  Preferred Locations
                </h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {tutor.preferredLocations.map((location, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-red-50 text-red-700 rounded-lg font-semibold border border-red-200"
                  >
                    📍 {location}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Contact Info */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow-lg p-8 border border-blue-100">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Contact Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 bg-white rounded-lg">
                <FaEnvelope className="text-blue-600 text-xl" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-semibold text-gray-800">{tutor.email}</p>
                </div>
              </div>

              {tutor.phone && (
                <div className="flex items-center gap-3 p-4 bg-white rounded-lg">
                  <FaPhone className="text-green-600 text-xl" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-semibold text-gray-800">{tutor.phone}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Contact Button */}
            <div className="mt-6 text-center">
              <a
                href={`mailto:${tutor.email}`}
                className="inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
              >
                Contact Tutor
              </a>
            </div>
          </div>
        </motion.div>
      </Container>
    </div>
  );
};

export default TutorProfile;
