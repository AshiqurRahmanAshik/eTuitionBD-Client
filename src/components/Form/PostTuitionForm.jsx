import { useForm } from "react-hook-form";

const PostTuitionForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const {
      subject,
      class: className,
      medium,
      location,
      budget,
      schedule,
      description,
      phone,
    } = data;

    const tuitionData = {
      subject,
      className,
      medium,
      location,
      budget: Number(budget),
      schedule,
      description,
      phone,
    };

    console.table(tuitionData);
  };

  return (
    <div className="space-y-6">
      {/* Subject */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Subject
        </label>
        <input
          {...register("subject", { required: "Subject is required" })}
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          placeholder="Enter subject name"
        />
        {errors.subject && (
          <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
        )}
      </div>

      {/* Class & Medium */}
      <div className="grid grid-cols-2 gap-4">
        {/* Class */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Class
          </label>
          <select
            {...register("class", { required: "Class is required" })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="">Select a class</option>
            <option value="Class 1">Class 1</option>
            <option value="Class 2">Class 2</option>
            <option value="Class 3">Class 3</option>
            <option value="Class 4">Class 4</option>
            <option value="Class 5">Class 5</option>
            <option value="Class 6">Class 6</option>
            <option value="Class 7">Class 7</option>
            <option value="Class 8">Class 8</option>
            <option value="Class 9">Class 9</option>
            <option value="Class 10">Class 10</option>
            <option value="SSC">SSC</option>
            <option value="HSC">HSC</option>
          </select>
          {errors.class && (
            <p className="mt-1 text-sm text-red-600">{errors.class.message}</p>
          )}
        </div>

        {/* Medium */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Medium
          </label>
          <select
            {...register("medium", { required: "Medium is required" })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="">Select medium</option>
            <option value="Bangla">Bangla Medium</option>
            <option value="English">English Medium</option>
            <option value="English Version">English Version</option>
          </select>
          {errors.medium && (
            <p className="mt-1 text-sm text-red-600">{errors.medium.message}</p>
          )}
        </div>
      </div>

      {/* Location */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Location
        </label>
        <input
          {...register("location", { required: "Location is required" })}
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          placeholder="Enter location"
        />
        {errors.location && (
          <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>
        )}
      </div>

      {/* Budget & Schedule */}
      <div className="grid grid-cols-2 gap-4">
        {/* Budget */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Budget
          </label>
          <input
            {...register("budget", {
              required: "Budget is required",
              min: { value: 0, message: "Budget must be positive" },
            })}
            type="number"
            step="0.01"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="0.00"
          />
          {errors.budget && (
            <p className="mt-1 text-sm text-red-600">{errors.budget.message}</p>
          )}
        </div>

        {/* Schedule */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Schedule
          </label>
          <input
            {...register("schedule", {
              required: "Schedule is required",
            })}
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="e.g., 5-7 PM"
          />
          {errors.schedule && (
            <p className="mt-1 text-sm text-red-600">
              {errors.schedule.message}
            </p>
          )}
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>
        <textarea
          {...register("description", { required: "Description is required" })}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          placeholder="Describe your requirement"
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">
            {errors.description.message}
          </p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Phone
        </label>
        <input
          {...register("phone", { required: "Phone is required" })}
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          placeholder="Enter phone number"
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit(onSubmit)}
        className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors font-medium"
      >
        Post Tuition
      </button>
    </div>
  );
};

export default PostTuitionForm;
