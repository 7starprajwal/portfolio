import { useState } from "react";
import {
  FaEye,
  FaEyeSlash,
  FaLock,
} from "react-icons/fa";
import { toast } from "react-toastify";

import { changePassword } from "../../../services/authService";

function PasswordSettings() {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] =
    useState({
      current: false,
      new: false,
      confirm: false,
    });

  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const togglePassword = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !formData.currentPassword ||
      !formData.newPassword ||
      !formData.confirmPassword
    ) {
      return toast.error(
        "All fields are required."
      );
    }

    if (
      formData.newPassword !==
      formData.confirmPassword
    ) {
      return toast.error(
        "Passwords do not match."
      );
    }

    if (formData.newPassword.length < 8) {
      return toast.error(
        "Password must be at least 8 characters."
      );
    }

    try {
      setLoading(true);

      const response =
        await changePassword({
          currentPassword:
            formData.currentPassword,
          newPassword:
            formData.newPassword,
        });

      toast.success(response.message);

      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to change password."
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 pr-12 text-white outline-none transition focus:border-cyan-500";

  return (
    <div className="mt-10 rounded-2xl bg-slate-900 p-8 shadow-lg">
      <div className="mb-8 flex items-center gap-3">
        <FaLock className="text-2xl text-cyan-400" />

        <div>
          <h2 className="text-2xl font-bold text-white">
            Change Password
          </h2>

          <p className="text-slate-400">
            Update your administrator password.
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        {/* Current Password */}

        <div className="relative">
          <label className="mb-2 block text-sm text-slate-300">
            Current Password
          </label>

          <input
            type={
              showPassword.current
                ? "text"
                : "password"
            }
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            className={inputClass}
          />

          <button
            type="button"
            onClick={() =>
              togglePassword("current")
            }
            className="absolute right-4 top-11 text-slate-400"
          >
            {showPassword.current ? (
              <FaEyeSlash />
            ) : (
              <FaEye />
            )}
          </button>
        </div>

        {/* New Password */}

        <div className="relative">
          <label className="mb-2 block text-sm text-slate-300">
            New Password
          </label>

          <input
            type={
              showPassword.new
                ? "text"
                : "password"
            }
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            className={inputClass}
          />

          <button
            type="button"
            onClick={() =>
              togglePassword("new")
            }
            className="absolute right-4 top-11 text-slate-400"
          >
            {showPassword.new ? (
              <FaEyeSlash />
            ) : (
              <FaEye />
            )}
          </button>
        </div>

        {/* Confirm Password */}

        <div className="relative">
          <label className="mb-2 block text-sm text-slate-300">
            Confirm New Password
          </label>

          <input
            type={
              showPassword.confirm
                ? "text"
                : "password"
            }
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={inputClass}
          />

          <button
            type="button"
            onClick={() =>
              togglePassword("confirm")
            }
            className="absolute right-4 top-11 text-slate-400"
          >
            {showPassword.confirm ? (
              <FaEyeSlash />
            ) : (
              <FaEye />
            )}
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-white transition hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading
            ? "Updating..."
            : "Update Password"}
        </button>
      </form>
    </div>
  );
}

export default PasswordSettings;