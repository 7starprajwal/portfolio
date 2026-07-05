import { useRef, useState } from "react";
import {
  FaCamera,
  FaTrash,
  FaUserCircle,
} from "react-icons/fa";

import {
  uploadProfileImage,
  deleteProfileImage,
  getAdminSettings,
} from "../../services/adminSettingService";

function ProfileSettings({
  settings,
  setSettings,
}) {
  const fileInputRef = useRef(null);

  const [uploading, setUploading] =
    useState(false);

  const profile = settings?.profile || {};

  const handleChange = (event) => {
    const { name, value } = event.target;

    setSettings((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        [name]: value,
      },
    }));
  };

  const handleChooseImage = () => {
    fileInputRef.current.click();
  };

  const handleUpload = async (event) => {
    const file = event.target.files[0];

    if (!file) return;

    try {
      setUploading(true);

      await uploadProfileImage(file);

      const response =
        await getAdminSettings();

      setSettings(response.settings);
    } catch (error) {
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteImage = async () => {
    try {
      setUploading(true);

      await deleteProfileImage();

      const response =
        await getAdminSettings();

      setSettings(response.settings);
    } catch (error) {
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-lg">
      {/* Header */}

      <div className="mb-10">
        <h2 className="text-3xl font-bold text-white">
          Admin Profile
        </h2>

        <p className="mt-2 text-slate-400">
          Manage your administrator profile.
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-[260px_1fr]">
        {/* Image */}

        <div className="flex flex-col items-center">
          <div className="flex h-56 w-56 items-center justify-center overflow-hidden rounded-full border-4 border-cyan-500 bg-slate-800 shadow-lg">
            {profile.image?.url ? (
              <img
                src={profile.image.url}
                alt="Profile"
                className="h-full w-full object-cover"
              />
            ) : (
              <FaUserCircle className="text-[170px] text-slate-500" />
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={handleUpload}
          />

          <button
            onClick={handleChooseImage}
            disabled={uploading}
            className="mt-6 flex items-center gap-3 rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-white transition hover:bg-cyan-600"
          >
            <FaCamera />

            {uploading
              ? "Uploading..."
              : "Change Photo"}
          </button>

          {profile.image?.url && (
            <button
              onClick={handleDeleteImage}
              disabled={uploading}
              className="mt-4 flex items-center gap-3 rounded-xl bg-red-500 px-6 py-3 font-semibold text-white transition hover:bg-red-600"
            >
              <FaTrash />

              Delete Photo
            </button>
          )}
        </div>

        {/* Form */}

        <div className="space-y-6">
          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Full Name
            </label>

            <input
              name="name"
              value={profile.name || ""}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-5 py-3 text-white outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Email
            </label>

            <input
              name="email"
              value={profile.email || ""}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-5 py-3 text-white outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Role
            </label>

            <input
              name="role"
              value={profile.role || ""}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-5 py-3 text-white outline-none focus:border-cyan-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProfileSettings;