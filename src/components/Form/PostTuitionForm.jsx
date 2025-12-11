import { useForm } from "react-hook-form";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import LoadingSpinner from "../Shared/LoadingSpinner";

const PostTuitionForm = () => {
  // useMutation hook useCase
  const {
    isPending,
    isError,
    mutateAsync,
    reset: mutationReset,
  } = useMutation({
    mutationFn: async (payload) =>
      await axios.post(`${import.meta.env.VITE_API_URL}/tuitions`, payload),
    onSuccess: (data) => {
      toast.success("Tuition posted successfully!");
      mutationReset();
      console.log("Tuition posted successfully:", data);
    },
    onError: (error) => {
      console.error("Error posting tuition:", error);
      toast.error("Failed to post tuition");
    },
    onMutate: (payload) => {
      console.log("Posting tuition with data:", payload);
    },
    onSettled: (data, error) => {
      if (data) {
        console.log("Tuition post settled with data:", data);
      }
      if (error) {
        console.error("Tuition post settled with error:", error);
      }
    },
    retry: 3,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
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

    try {
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
      await mutateAsync(tuitionData);
      reset();
    } catch (err) {
      console.log(err);
    }
  };

  if (isPending) return <LoadingSpinner />;
  if (isError) return <div>Error occurred while posting tuition</div>;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md"
    >
      {/* Subject */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Subject
        </label>
        <input
          {...register("subject", { required: "Subject is required" })}
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          placeholder="Enter subject"
        />
        {errors.subject && (
          <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
        )}
      </div>

      {/* Class & Medium */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
            <option value="Bangla Medium">Bangla Medium</option>
            <option value="English Medium">English Medium</option>
            <option value="English Version">English Version</option>
          </select>
          {errors.medium && (
            <p className="mt-1 text-sm text-red-600">{errors.medium.message}</p>
          )}
        </div>
      </div>

      {/* Location */}
      <div className="mb-4">
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Budget */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Budget
          </label>
          <input
            {...register("budget", { required: "Budget is required" })}
            type="number"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Enter budget"
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
            {...register("schedule", { required: "Schedule is required" })}
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Enter schedule"
          />
          {errors.schedule && (
            <p className="mt-1 text-sm text-red-600">
              {errors.schedule.message}
            </p>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>
        <textarea
          {...register("description", { required: "Description is required" })}
          rows="4"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          placeholder="Enter description"
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">
            {errors.description.message}
          </p>
        )}
      </div>

      {/* Phone */}
      <div className="mb-6">
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
        type="submit"
        disabled={isPending}
        className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? "Posting..." : "Post Tuition"}
      </button>
    </form>
  );
};

export default PostTuitionForm;
