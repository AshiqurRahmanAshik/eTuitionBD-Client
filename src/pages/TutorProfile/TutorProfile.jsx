import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Container from "../../components/Shared/Container";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import { motion } from "framer-motion";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiUser,
  FiBook,
  FiAward,
  FiStar,
  FiBriefcase,
  FiCalendar,
} from "react-icons/fi";

const TutorProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch tutor details
  const {
    data: tutor,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tutorProfile", id],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/users/${id}`
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
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              View All Tutors
            </button>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-12">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-5xl mx-auto"
        >
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="mb-6 flex items-center gap-2 text-purple-600 hover:text-purple-800 font-medium transition-colors"
          >
            ← Back
          </button>

          {/* Profile Header */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-8 text-white">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                {/* Profile Image */}
                <div className="w-32 h-32 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-6xl border-4 border-white/30">
                  {tutor.photo ? (
                    <img
                      src={tutor.photo}
                      alt={tutor.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <FiUser />
                  )}
                </div>

                {/* Profile Info */}
                <div className="flex-1 text-center md:text-left">
                  <h1 className="text-3xl md:text-4xl font-bold mb-2">
                    {tutor.name}
                  </h1>
                  <p className="text-purple-100 mb-4">
                    {tutor.education || "Tutor"}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center gap-2 justify-center md:justify-start mb-4">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <FiStar
                          key={i}
                          className={`${
                            i < Math.round(tutor.rating || 0)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-white/30"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-semibold">
                      {tutor.rating?.toFixed(1) || "0.0"}
                    </span>
                    <span className="text-purple-100">
                      ({tutor.totalReviews || 0} reviews)
                    </span>
                  </div>

                  {/* Quick Stats */}
                  <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                    <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                      <div className="text-sm font-medium">Experience</div>
                      <div className="text-lg font-bold">
                        {tutor.experience || 0} years
                      </div>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                      <div className="text-sm font-medium">Completed</div>
                      <div className="text-lg font-bold">
                        {tutor.completedTuitions || 0} tuitions
                      </div>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                      <div className="text-sm font-medium">Status</div>
                      <div className="text-lg font-bold">
                        {tutor.status === "approved" ? "✓ Verified" : "Pending"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="p-6 bg-gradient-to-br from-purple-50 to-blue-50">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <FiMail className="text-purple-600 text-xl" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Email</div>
                    <div className="font-medium text-gray-800">
                      {tutor.email}
                    </div>
                  </div>
                </div>

                {tutor.phone && (
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <FiPhone className="text-purple-600 text-xl" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Phone</div>
                      <div className="font-medium text-gray-800">
                        {tutor.phone}
                      </div>
                    </div>
                  </div>
                )}

                {tutor.location && (
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <FiMapPin className="text-purple-600 text-xl" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Location</div>
                      <div className="font-medium text-gray-800">
                        {tutor.location}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* About */}
              {tutor.bio && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white rounded-xl shadow-lg p-6"
                >
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <FiUser className="text-purple-600" />
                    About Me
                  </h2>
                  <p className="text-gray-600 whitespace-pre-wrap leading-relaxed">
                    {tutor.bio}
                  </p>
                </motion.div>
              )}

              {/* Expertise */}
              {tutor.expertise && tutor.expertise.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white rounded-xl shadow-lg p-6"
                >
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <FiBook className="text-purple-600" />
                    Subjects I Teach
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {tutor.expertise.map((subject, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-800 rounded-full font-medium"
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Education */}
              {tutor.education && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white rounded-xl shadow-lg p-6"
                >
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <FiAward className="text-purple-600" />
                    Education
                  </h2>
                  <p className="text-gray-700 font-medium">{tutor.education}</p>
                </motion.div>
              )}
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Gender */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <FiUser className="text-purple-600 text-xl" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Gender</div>
                    <div className="font-semibold text-gray-800">
                      {tutor.gender || "Not specified"}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Experience */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <FiBriefcase className="text-purple-600 text-xl" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Experience</div>
                    <div className="font-semibold text-gray-800">
                      {tutor.experience || 0} years
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Member Since */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <FiCalendar className="text-purple-600 text-xl" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Member Since</div>
                    <div className="font-semibold text-gray-800">
                      {new Date(tutor.createdAt).toLocaleDateString("en-US", {
                        month: "long",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Availability */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl shadow-lg p-6"
              >
                <h3 className="font-bold text-gray-800 mb-3">Current Status</h3>
                <div
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
                    tutor.status === "approved"
                      ? "bg-green-500 text-white"
                      : "bg-yellow-500 text-white"
                  }`}
                >
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  <span className="font-medium">
                    {tutor.status === "approved"
                      ? "Available for tuition"
                      : "Pending approval"}
                  </span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Contact Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-8 text-center"
          >
            <a
              href={`mailto:${tutor.email}`}
              className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 text-white px-12 py-4 rounded-xl font-semibold hover:shadow-lg transition-all transform hover:scale-105"
            >
              Contact Tutor
            </a>
          </motion.div>
        </motion.div>
      </Container>
    </div>
  );
};

export default TutorProfile;
