import { Link } from "react-router";

const Card = ({ tuition }) => {
  const {
    _id,
    subject,
    className,
    medium,
    location,
    schedule,
    budget,
    description,
  } = tuition || {};
  return (
    <Link
      to={`/tuition/${_id}`}
      className="col-span-1 cursor-pointer group shadow-xl p-3 rounded-xl hover:shadow-2xl transition"
    >
      <div className="flex flex-col gap-2 w-full">
        <div
          className="
              aspect-square 
              w-full 
              relative 
              overflow-hidden 
              rounded-xl
              bg-gradient-to-br from-blue-100 to-purple-100
              flex items-center justify-center
            "
        >
          <div className="text-center p-4">
            <div className="text-4xl font-bold text-blue-600 mb-2">
              {subject}
            </div>
            <div className="text-xl font-semibold text-purple-600">
              {className}
            </div>
          </div>
        </div>

        <div className="font-semibold text-lg">{subject}</div>

        <div className="text-sm text-gray-600">
          <span className="font-medium">Class:</span> {className}
        </div>

        <div className="text-sm text-gray-600">
          <span className="font-medium">Medium:</span> {medium}
        </div>

        <div className="text-sm text-gray-600">
          <span className="font-medium">Location:</span> {location}
        </div>

        <div className="text-sm text-gray-600">
          <span className="font-medium">Schedule:</span> {schedule}
        </div>

        <div className="flex flex-row items-center gap-1 mt-2">
          <div className="font-bold text-lg text-green-600">
            Budget: ৳{budget}
          </div>
        </div>

        <div className="text-sm text-gray-500 line-clamp-2">{description}</div>
      </div>
    </Link>
  );
};

export default Card;
