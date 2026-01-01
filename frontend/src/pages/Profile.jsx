import { useEffect, useState } from "react";

const ProfileButton = () => {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user"); // remove user
    setUser(null); // update state
    setOpen(false); // close dropdown
    // Optional: redirect to login page
    window.location.href = "/login";
  };

  if (!user) return null;

  return (
    <div className="relative inline-block">
      {/* Profile Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full transition"
      >
        <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-semibold">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <span className="text-gray-800 font-medium">{user.name}</span>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-lg border z-50">
          <div className="p-4 border-b">
            <p className="font-semibold text-gray-800">{user.name}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>

          <div className="p-4 space-y-2 text-sm">
            <p>
              <span className="font-medium text-gray-600">Role:</span> {user.role}
            </p>
          </div>

          <div className="border-t p-3 flex justify-between items-center">
            <button
              onClick={() => setOpen(false)}
              className="text-sm text-purple-600 hover:underline"
            >
              Close
            </button>

            <button
              onClick={handleLogout}
              className="text-sm text-red-600 hover:underline"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileButton;
