import { Link } from "react-router";
import {
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaStar,
  FaGraduationCap,
  FaCheckCircle,
  FaBook,
  FaBriefcase,
} from "react-icons/fa";

const TutorCard = ({ tutor }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-gray-100">
      {/* Tutor Image */}
      <div className="relative h-56 overflow-hidden bg-linear-to-br from-blue-100 to-purple-100">
        <img
          src={tutor.photoURL || "https://via.placeholder.com/300"}
          alt={tutor.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />

        {/* Verified Badge */}
        {tutor.isVerified && (
          <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
            <FaCheckCircle />
            Verified
          </div>
        )}

        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              tutor.status === "Active"
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {tutor.status}
          </span>
        </div>
      </div>

      {/* Tutor Info */}
      <div className="p-6">
        {/* Name & Rating */}
        <div className="mb-4">
          <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition">
            {tutor.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center text-yellow-500">
              <FaStar />
              <span className="ml-1 font-semibold text-gray-800">
                {tutor.rating || 0}
              </span>
            </div>
            <span className="text-gray-500 text-sm">
              ({tutor.totalReviews || 0} reviews)
            </span>
          </div>
        </div>

        {/* Qualifications */}
        <div className="mb-4">
          <div className="flex items-start text-gray-700 mb-2">
            <FaGraduationCap className="mr-2 text-blue-500 mt-1 shrink" />
            <span className="text-sm">{tutor.qualifications}</span>
          </div>

          {/* Experience */}
          <div className="flex items-center text-gray-700 mb-2">
            <FaBriefcase className="mr-2 text-purple-500 shrink" />
            <span className="text-sm">{tutor.experience} experience</span>
          </div>

          {/* Subjects */}
          {tutor.subjects && tutor.subjects.length > 0 && (
            <div className="flex items-start text-gray-700 mb-2">
              <FaBook className="mr-2 text-green-500 mt-1 shrink" />
              <span className="text-sm">{tutor.subjects.join(", ")}</span>
            </div>
          )}

          {/* Location */}
          {tutor.preferredLocations && tutor.preferredLocations.length > 0 && (
            <div className="flex items-start text-gray-700 mb-3">
              <FaMapMarkerAlt className="mr-2 text-red-500 mt-1 shrink" />
              <span className="text-sm">
                {tutor.preferredLocations.join(", ")}
              </span>
            </div>
          )}

          {/* Expected Salary */}
          <div className="flex items-center text-gray-700">
            <FaMoneyBillWave className="mr-2 text-green-500 shrink" />
            <span className="font-semibold text-lg text-green-600">
              ৳{tutor.expectedSalary}/month
            </span>
          </div>
        </div>

        {/* Classes */}
        {tutor.classes && tutor.classes.length > 0 && (
          <div className="mb-4">
            <p className="text-xs text-gray-500 mb-2">Teaching Classes:</p>
            <div className="flex flex-wrap gap-2">
              {tutor.classes.map((cls, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-xs font-medium"
                >
                  Class {cls}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* View Profile Button */}
        <Link
          to={`/tutors/${tutor.email}`}
          className="w-full block text-center px-4 py-3 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition font-medium shadow-md"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
};

export default TutorCard;
