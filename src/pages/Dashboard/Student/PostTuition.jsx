import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const PostTuition = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    subject: "",
    class: "",
    studentGender: "Any",
    tutorGender: "Any",
    location: "",
    salary: "",
    perWeek: "",
    tutorRequirements: "",
    additionalInfo: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const tuitionData = {
        ...formData,
        studentName: user.displayName || user.name,
        studentEmail: user.email,
        salary: parseFloat(formData.salary),
        perWeek: parseInt(formData.perWeek),
        status: "pending",
      };

      await axiosSecure.post("/tuitions", tuitionData);
      toast.success("Tuition posted successfully! Waiting for admin approval.");
      navigate("/dashboard/my-tuitions");
    } catch (error) {
      console.error("Error posting tuition:", error);
      toast.error(error.response?.data?.message || "Failed to post tuition");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Post New Tuition
          </h2>
          <p className="text-gray-600 mt-1">
            Fill in the details to find a qualified tutor
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-md p-6 space-y-6"
        >
          {/* Subject */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subject *
            </label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              placeholder="e.g., Mathematics, Physics, English"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Class */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Class/Grade *
            </label>
            <select
              name="class"
              value={formData.class}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select Class</option>
              <option value="1">Class 1</option>
              <option value="2">Class 2</option>
              <option value="3">Class 3</option>
              <option value="4">Class 4</option>
              <option value="5">Class 5</option>
              <option value="6">Class 6</option>
              <option value="7">Class 7</option>
              <option value="8">Class 8</option>
              <option value="9">Class 9</option>
              <option value="10">Class 10</option>
              <option value="11">Class 11</option>
              <option value="12">Class 12</option>
              <option value="Honors 1st Year">Honors 1st Year</option>
              <option value="Honors 2nd Year">Honors 2nd Year</option>
              <option value="Honors 3rd Year">Honors 3rd Year</option>
              <option value="Honors 4th Year">Honors 4th Year</option>
            </select>
          </div>

          {/* Grid for Gender selections */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* Student Gender */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Student Gender *
              </label>
              <select
                name="studentGender"
                value={formData.studentGender}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Any">Any</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            {/* Tutor Gender Preference */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Tutor Gender *
              </label>
              <select
                name="tutorGender"
                value={formData.tutorGender}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Any">Any</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location *
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              placeholder="e.g., Dhanmondi, Dhaka"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Grid for Salary and Classes per week */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* Salary */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Salary (BDT/month) *
              </label>
              <input
                type="number"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                required
                min="500"
                placeholder="e.g., 5000"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Classes Per Week */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Classes Per Week *
              </label>
              <input
                type="number"
                name="perWeek"
                value={formData.perWeek}
                onChange={handleChange}
                required
                min="1"
                max="7"
                placeholder="e.g., 3"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Tutor Requirements */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tutor Requirements
            </label>
            <textarea
              name="tutorRequirements"
              value={formData.tutorRequirements}
              onChange={handleChange}
              rows="3"
              placeholder="e.g., Experienced tutor, Good communication skills"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Additional Info */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Information
            </label>
            <textarea
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleChange}
              rows="3"
              placeholder="Any other details you want to share..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={isLoading}
              className={`flex-1 py-3 px-6 rounded-lg font-semibold text-white transition-colors ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isLoading ? "Posting..." : "Post Tuition"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/dashboard/my-tuitions")}
              className="px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>

          {/* Note */}
          <p className="text-sm text-gray-500 text-center">
            * Your tuition post will be reviewed by admin before being visible
            to tutors
          </p>
        </form>
      </div>
    </div>
  );
};

export default PostTuition;
