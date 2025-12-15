const LoadingSpinner = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="relative w-24 h-24 mx-auto mb-4">
          <div className="absolute top-0 left-0 w-full h-full border-8 border-blue-200 rounded-full"></div>
          <div className="absolute top-0 left-0 w-full h-full border-8 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Loading...
        </h2>
        <p className="text-gray-600">Please wait!!!</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
