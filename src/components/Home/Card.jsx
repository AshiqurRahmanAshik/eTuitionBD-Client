import { Link } from "react-router";
import {
  FaGraduationCap,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaBook,
  FaCalendarAlt,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaCheckCircle,
  FaArrowRight,
} from "react-icons/fa";

const Card = ({ tuition }) => {
  const {
    _id,
    subject,
    class: className,
    studentGender,
    tutorGender,
    location,
    salary,
    perWeek,
    tutorRequirements,
    additionalInfo,
    postedBy,
    status,
    createdAt,
  } = tuition || {};

  return (
    <Link to={`/tuition/${_id}`} className="group block h-full">
      <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-300 h-full flex flex-col">
        {/* Top Gradient Bar */}
        <div className="h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600"></div>

        {/* Content */}
        <div className="p-6 flex flex-col h-full">
          {/* Header Section */}
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-md">
                  <FaBook className="text-white text-lg" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                  {subject}
                </h3>
              </div>
              <div className="flex items-center gap-2 text-gray-600 ml-1">
                <FaGraduationCap className="text-purple-500" />
                <span className="font-semibold text-lg">Class {className}</span>
              </div>
            </div>

            {/* Status Badge */}
            {status && (
              <span
                className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 ${
                  status === "approved"
                    ? "bg-green-100 text-green-700 border border-green-300"
                    : status === "pending"
                    ? "bg-yellow-100 text-yellow-700 border border-yellow-300"
                    : "bg-blue-100 text-blue-700 border border-blue-300"
                }`}
              >
                {status === "approved" && <FaCheckCircle />}
                {status.toUpperCase()}
              </span>
            )}
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-4"></div>

          {/* Info Grid */}
          <div className="space-y-3 mb-4">
            {/* Location */}
            <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl border border-red-100">
              <div className="p-2 bg-white rounded-lg shadow-sm">
                <FaMapMarkerAlt className="text-red-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500 font-medium">Location</p>
                <p className="text-sm font-semibold text-gray-800 truncate">
                  {location}
                </p>
              </div>
            </div>

            {/* Schedule */}
            <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-100">
              <div className="p-2 bg-white rounded-lg shadow-sm">
                <FaCalendarAlt className="text-blue-500" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500 font-medium">Schedule</p>
                <p className="text-sm font-semibold text-gray-800">
                  {perWeek} days per week
                </p>
              </div>
            </div>

            {/* Gender Requirements */}
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center gap-2 p-2.5 bg-purple-50 rounded-lg border border-purple-100">
                <FaUserGraduate className="text-purple-500 text-sm" />
                <div>
                  <p className="text-xs text-gray-500">Student</p>
                  <p className="text-xs font-semibold text-gray-800">
                    {studentGender}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-indigo-50 rounded-lg border border-indigo-100">
                <FaChalkboardTeacher className="text-indigo-500 text-sm" />
                <div>
                  <p className="text-xs text-gray-500">Tutor Pref</p>
                  <p className="text-xs font-semibold text-gray-800">
                    {tutorGender}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Requirements */}
          {tutorRequirements && (
            <div className="mb-4 p-3 bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl border border-yellow-100">
              <p className="text-xs text-amber-700 font-semibold mb-1 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
                Tutor Requirements
              </p>
              <p className="text-sm text-gray-700 line-clamp-2 leading-relaxed">
                {tutorRequirements}
              </p>
            </div>
          )}

          {/* Additional Info */}
          {additionalInfo && (
            <div className="mb-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
              <p className="text-xs text-gray-500 font-medium mb-1">
                Additional Info
              </p>
              <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                {additionalInfo}
              </p>
            </div>
          )}

          {/* Salary Section - Always at bottom */}
          <div className="mt-auto pt-4">
            <div className="p-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl shadow-lg group-hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-white/20 rounded-xl backdrop-blur-sm">
                    <FaMoneyBillWave className="text-white text-xl" />
                  </div>
                  <div>
                    <p className="text-xs text-green-100 font-medium">
                      Monthly Salary
                    </p>
                    <p className="text-2xl font-bold text-white">৳{salary}</p>
                  </div>
                </div>
                <div className="p-3 bg-white/20 rounded-full group-hover:bg-white/30 transition-all backdrop-blur-sm">
                  <FaArrowRight className="text-white text-lg transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>

          {/* Posted By (Optional - shown on hover) */}
          {postedBy && (
            <div className="mt-3 pt-3 border-t border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity">
              <p className="text-xs text-gray-400">
                Posted by {postedBy.name || postedBy.email}
              </p>
            </div>
          )}
        </div>

        {/* Decorative Glow on Hover */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 via-purple-400/5 to-indigo-400/5 rounded-2xl"></div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
