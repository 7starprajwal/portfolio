import { useState } from "react";
import { toast } from "react-toastify";
import {
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import { changePassword } from "../../services/authService";

function PasswordSettings() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (
      !formData.currentPassword ||
      !formData.newPassword ||
      !formData.confirmPassword
    ) {
      return toast.error("Please fill all fields.");
    }

    if (
      formData.newPassword !==
      formData.confirmPassword
    ) {
      return toast.error("Passwords do not match.");
    }

    try {
      setLoading(true);

      const response = await changePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });

      toast.success(response.message);

      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      toast.error(
        error.message ||
          "Failed to change password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-lg">
      <div className="mb-10">
        <h2 className="flex items-center gap-3 text-3xl font-bold text-white">
          <FaLock className="text-cyan-400" />
          Change Password
        </h2>

        <p className="mt-2 text-slate-400">
          Update your admin account password.
        </p>
      </div>

      <div className="grid gap-6">
        {/* Current Password */}

        <div>
          <label className="mb-2 block text-sm text-slate-300">
            Current Password
          </label>

          <div className="relative">
            <input
              type={showCurrent ? "text" : "password"}
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-5 py-3 pr-14 text-white outline-none focus:border-cyan-500"
            />

            <button
              type="button"
              onClick={() =>
                setShowCurrent(!showCurrent)
              }
              className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400"
            >
              {showCurrent ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )}
            </button>
          </div>
        </div>

        {/* New Password */}

        <div>
          <label className="mb-2 block text-sm text-slate-300">
            New Password
          </label>

          <div className="relative">
            <input
              type={showNew ? "text" : "password"}
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-5 py-3 pr-14 text-white outline-none focus:border-cyan-500"
            />

            <button
              type="button"
              onClick={() =>
                setShowNew(!showNew)
              }
              className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400"
            >
              {showNew ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )}
            </button>
          </div>
        </div>

        {/* Confirm Password */}

        <div>
          <label className="mb-2 block text-sm text-slate-300">
            Confirm Password
          </label>

          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-5 py-3 pr-14 text-white outline-none focus:border-cyan-500"
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirm(!showConfirm)
              }
              className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400"
            >
              {showConfirm ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )}
            </button>
          </div>
        </div>

        <div className="pt-2">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="rounded-xl bg-cyan-500 px-8 py-3 font-semibold text-white transition hover:bg-cyan-600 disabled:opacity-60"
          >
            {loading
              ? "Updating..."
              : "Update Password"}
          </button>
        </div>
      </div>
    </section>
  );
}

export default PasswordSettings;