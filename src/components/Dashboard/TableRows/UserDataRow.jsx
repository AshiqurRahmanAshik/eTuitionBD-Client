import { useState } from "react";
import UpdateUserRoleModal from "../../Modal/UpdateUserRoleModal";

const UserDataRow = ({ user, refetch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);

  // Safety check
  if (!user) return null;

  const isAdmin = user.role?.toLowerCase() === "admin";

  return (
    <tr>
      {/* Email */}
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-nowrap">{user.email || "N/A"}</p>
      </td>

      {/* Role */}
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
            isAdmin
              ? "bg-purple-100 text-purple-800"
              : user.role?.toLowerCase() === "tutor"
              ? "bg-blue-100 text-blue-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {user.role || "student"}
        </span>
      </td>

      {/* Status */}
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            isAdmin ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
          }`}
        >
          {isAdmin ? "Admin" : "Active"}
        </span>
      </td>

      {/* Action */}
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        {!isAdmin ? (
          <button
            onClick={() => setIsOpen(true)}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
          >
            Update Role
          </button>
        ) : (
          <span className="text-gray-400 text-sm">No Action</span>
        )}

        {/* Modal */}
        <UpdateUserRoleModal
          isOpen={isOpen}
          closeModal={closeModal}
          email={user.email}
          currentRole={user.role}
          refetch={refetch}
        />
      </td>
    </tr>
  );
};

export default UserDataRow;
