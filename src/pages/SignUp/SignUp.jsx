import { Link, useLocation, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";
import { useForm } from "react-hook-form";

const SignUp = () => {
  const { createUser, updateUserProfile, signInWithGoogle, loading } =
    useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || "/";

  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Submit Handler
  const onSubmit = async (data) => {
    const { name, image, email, password } = data;

    try {
      // 1. User Registration
      const result = await createUser(email, password);

      // 2. Save username & profile photo
      await updateUserProfile(
        name,
        "https://lh3.googleusercontent.com/a/ACg8ocKUMU3XIX-JSUB80Gj_bYIWfYudpibgdwZE1xqmAGxHASgdvCZZ=s96-c"
      );

      console.log(result);

      toast.success("Signup Successful");
      navigate(from, { replace: true });
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
  };

  // Google Sign-in
  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      toast.success("Signup Successful");
      navigate(from, { replace: true });
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Sign Up</h1>
          <p className="text-sm text-gray-400">Welcome to PlantNet</p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-6"
        >
          <div className="space-y-4">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block mb-2 text-sm">
                Name
              </label>
              <input
                {...register("name", { required: "Name is required" })}
                type="text"
                id="name"
                placeholder="Enter Your Name Here"
                className="w-full px-3 py-2 border rounded-md bg-gray-200 text-gray-900"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            {/* Image */}
            <div>
              <label htmlFor="image" className="block mb-2 text-sm">
                Profile Image
              </label>
              <input
                {...register("image", { required: "Image is required" })}
                type="file"
                id="image"
                accept="image/*"
                className="w-full px-3 py-2 bg-gray-100 border border-dashed border-lime-300 rounded-md"
              />
              {errors.image && (
                <p className="text-red-500 text-sm">{errors.image.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Email Address
              </label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Please enter a valid email",
                  },
                })}
                type="email"
                id="email"
                placeholder="Enter Your Email Here"
                className="w-full px-3 py-2 border rounded-md bg-gray-200 text-gray-900"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block mb-2 text-sm">
                Password
              </label>

              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                type="password"
                id="password"
                placeholder="*******"
                className="w-full px-3 py-2 border rounded-md bg-gray-200 text-gray-900"
              />

              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="bg-lime-500 w-full rounded-md py-3 text-white"
            >
              {loading ? (
                <TbFidgetSpinner className="animate-spin m-auto" />
              ) : (
                "Continue"
              )}
            </button>
          </div>
        </form>

        {/* Social Login */}
        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px bg-gray-300"></div>
          <p className="px-3 text-sm text-gray-500">
            Signup with social accounts
          </p>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        <div
          onClick={handleGoogleSignIn}
          className="flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 cursor-pointer"
        >
          <FcGoogle size={32} />
          <p>Continue with Google</p>
        </div>

        {/* Login Link */}
        <p className="px-6 text-sm text-center text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="hover:text-lime-500">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
