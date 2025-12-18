import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";

const Profile = () => {
  const { user, updateUserName } = useAuth(); // function to update name in backend/Firebase
  const [role, isRoleLoading] = useRole();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState(user?.displayName || "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUserName(name); // only update name
      setIsModalOpen(false);
    } catch (err) {
      console.error("Name update failed:", err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-3xl overflow-hidden">
        {/* Cover Image */}
        <div className="w-full h-42 bg-linear-to-r from-blue-400 to-indigo-600"></div>

        {/* Profile Info */}
        <div className="flex flex-col items-center -mt-14 p-6">
          <img
            alt="profile"
            src={user?.photoURL}
            className="object-cover rounded-full h-28 w-28 border-4 border-white shadow-md"
          />

          <div className="mt-3">
            {isRoleLoading ? (
              <span className="px-4 py-1 text-xs rounded-full bg-gray-300 text-gray-600">
                Loading role...
              </span>
            ) : (
              <span className="px-4 py-1 text-xs rounded-full bg-blue-500 text-white font-semibold uppercase">
                {role}
              </span>
            )}
          </div>

          <p className="mt-3 text-sm text-gray-500">
            User ID: <span className="font-medium">{user?.uid}</span>
          </p>

          {/* Info Box */}
          <div className="w-full mt-6 bg-gray-50 rounded-xl p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <InfoItem label="Name" value={user?.displayName || "N/A"} />
              <InfoItem label="Email" value={user?.email || "N/A"} />
            </div>

            {/* Update Name Button */}
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-500 px-6 py-2 rounded-lg text-white font-semibold hover:bg-blue-600 transition"
              >
                Update Name
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Update Name Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-center text-gray-800 mb-4">
              Update Name
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-gray-600 text-sm">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-lime-400"
                />
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-200 rounded-lg text-gray-700 hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-lime-500 rounded-lg text-white hover:bg-lime-600 transition"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;

/* ---------- Reusable Info Item ---------- */
const InfoItem = ({ label, value }) => (
  <div className="flex flex-col">
    <span className="text-gray-500 text-xs">{label}</span>
    <span className="font-semibold text-gray-800">{value}</span>
  </div>
);
