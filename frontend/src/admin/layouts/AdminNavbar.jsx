import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";

import { removeToken } from "../services/authService";
import { getAdminSettings } from "../services/adminSettingService";

function AdminNavbar() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await getAdminSettings();

      setProfile(response.settings.profile);
    } catch (error) {
      console.error(
        "Failed to load profile:",
        error
      );
    }
  };

  const handleLogout = () => {
    removeToken();

    navigate("/admin/login", {
      replace: true,
    });
  };

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-slate-800 bg-slate-900 px-6 shadow-md">
      {/* Page Title */}
      <div>
        <h2 className="text-2xl font-bold text-white">
          Admin Dashboard
        </h2>

        <p className="text-sm text-slate-400">
          Manage your portfolio content
        </p>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-5">
        {/* Admin Info */}
        <div className="hidden text-right md:block">
          <p className="font-medium text-white">
            {profile?.name || "Admin"}
          </p>

          <p className="text-sm text-slate-400">
            {profile?.role ||
              "Portfolio Manager"}
          </p>
        </div>

        {/* Avatar */}
        {profile?.image?.url ? (
          <img
            src={profile.image.url}
            alt={profile.name}
            className="h-12 w-12 rounded-full border-2 border-cyan-400 object-cover"
          />
        ) : (
          <FaUserCircle className="text-4xl text-cyan-400" />
        )}

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </header>
  );
}

export default AdminNavbar;