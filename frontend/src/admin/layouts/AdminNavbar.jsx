import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUserCircle,
  FaSignOutAlt,
  FaBars,
} from "react-icons/fa";

import { removeToken } from "../services/authService";
import { getAdminSettings } from "../services/adminSettingService";

function AdminNavbar({ setSidebarOpen }) {
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
      console.error("Failed to load profile:", error);
    }
  };

  const handleLogout = () => {
    removeToken();

    navigate("/admin/login", {
      replace: true,
    });
  };

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-slate-800 bg-slate-900 px-4 shadow-md lg:px-6">
      {/* Left Section */}
      <div className="flex items-center gap-3">
        {/* Mobile Menu */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="rounded-lg p-2 text-white transition hover:bg-slate-800 lg:hidden"
        >
          <FaBars size={20} />
        </button>

        {/* Title */}
        <div>
          <h2 className="text-xl font-bold text-white lg:text-2xl">
            Admin Dashboard
          </h2>

          <p className="hidden text-sm text-slate-400 sm:block">
            Manage your portfolio content
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3 lg:gap-5">
        {/* Admin Info */}
        <div className="hidden text-right md:block">
          <p className="font-medium text-white">
            {profile?.name || "Admin"}
          </p>

          <p className="text-sm text-slate-400">
            {profile?.role || "Portfolio Manager"}
          </p>
        </div>

        {/* Avatar */}
        {profile?.image?.url ? (
          <img
            src={profile.image.url}
            alt={profile.name}
            className="h-10 w-10 rounded-full border-2 border-cyan-400 object-cover lg:h-12 lg:w-12"
          />
        ) : (
          <FaUserCircle className="text-3xl text-cyan-400 lg:text-4xl" />
        )}

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-lg bg-red-500 px-3 py-2 text-white transition hover:bg-red-600 lg:px-4"
        >
          <FaSignOutAlt />
          <span className="hidden sm:inline">
            Logout
          </span>
        </button>
      </div>
    </header>
  );
}

export default AdminNavbar;