import { useState } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import Container from "../../components/Shared/Container";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import PurchaseModal from "../../components/Modal/TutorApplicationModal";
import useRole from "../../hooks/useRole";

const TuitionDetails = () => {
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);

  // 🔐 Get role from backend
  const [role, isRoleLoading] = useRole();
  const isStudent = role === "Student";

  const {
    data: tuition = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["tuitionDetails", id],
    enabled: !!id,
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/tuitions/${id}`
      );
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  if (isError) {
    return (
      <Container>
        <p className="text-center text-red-500 text-xl">
          Failed to load tuition details
        </p>
      </Container>
    );
  }

  const handleApply = () => {
    if (isStudent) return;
    setIsOpen(true);
  };

  return (
    <Container>
      <div className="max-w-4xl mx-auto py-12">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-blue-600">
              {tuition.subject}
            </h1>
            <p className="text-xl text-gray-600 mt-2">Class {tuition.class}</p>
          </div>

          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InfoRow label="Location" value={tuition.location} />
            <InfoRow label="Classes / Week" value={tuition.perWeek} />
            <InfoRow label="Student Gender" value={tuition.studentGender} />
            <InfoRow label="Tutor Preference" value={tuition.tutorGender} />
          </div>

          <hr />

          {/* Tutor Requirements */}
          <Section
            title="Tutor Requirements"
            content={tuition.tutorRequirements}
          />

          {/* Additional Info */}
          <Section
            title="Additional Information"
            content={tuition.additionalInfo}
          />

          <hr />

          {/* Salary & Status */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-3xl font-bold text-green-600">
              ৳ {Number(tuition.salary).toLocaleString()}
              <span className="text-base text-gray-500 font-normal">
                {" "}
                / month
              </span>
            </p>

            <span
              className={`px-4 py-2 rounded-full text-sm font-semibold
                ${
                  tuition.status === "approved"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
            >
              {tuition.status?.toUpperCase()}
            </span>
          </div>

          {/* Apply Button */}
          <div className="text-center space-y-2">
            <button
              disabled={isStudent || isRoleLoading}
              onClick={handleApply}
              className={`px-10 py-3 rounded-xl text-lg font-semibold transition
                ${
                  isStudent || isRoleLoading
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
            >
              {isRoleLoading ? "Checking role..." : "Apply for Tuition"}
            </button>

            {isStudent && !isRoleLoading && (
              <p className="text-sm text-red-500">
                Students are not allowed to apply for tuition
              </p>
            )}
          </div>
        </div>

        {/* Modal */}
        <PurchaseModal
          isOpen={isOpen}
          closeModal={() => setIsOpen(false)}
          tuition={tuition}
        />
      </div>
    </Container>
  );
};

export default TuitionDetails;

/* ---------- Reusable Components ---------- */

const InfoRow = ({ label, value }) => (
  <div className="flex justify-between items-center border-b pb-2">
    <span className="text-gray-500">{label}</span>
    <span className="font-semibold text-gray-800">{value}</span>
  </div>
);

const Section = ({ title, content }) => (
  <div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{content}</p>
  </div>
);
