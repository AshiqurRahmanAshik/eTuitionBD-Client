import { Link } from "react-router";
import { FaHome, FaExclamationTriangle } from "react-icons/fa";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-purple-50">
      <div className="text-center px-4">
        <div className="mb-8">
          <FaExclamationTriangle className="text-9xl text-yellow-500 mx-auto mb-6 animate-bounce" />
          <h1 className="text-9xl font-bold text-gray-800 mb-4">404</h1>
          <h2 className="text-4xl font-semibold text-gray-700 mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved. Let's
            get you back on track!
          </p>
        </div>

        <div className="flex gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
          >
            <FaHome />
            Go Back Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="px-8 py-4 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
          >
            Go Back
          </button>
        </div>

        <div className="mt-12">
          <p className="text-gray-500">
            Need help?{" "}
            <Link to="/contact" className="text-blue-600 hover:underline">
              Contact us
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
