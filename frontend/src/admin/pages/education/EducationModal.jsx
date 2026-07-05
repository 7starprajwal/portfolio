import { useEffect, useState } from "react";
import {
  FaImage,
  FaTimes,
} from "react-icons/fa";

function EducationModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  loading,
}) {
  const [formData, setFormData] = useState({
    degree: "",
    specialization: "",
    institution: "",
    university: "",
    location: "",
    startDate: "",
    endDate: "",
    cgpa: "",
    description: "",
    achievements: "",
    featured: false,
    isPublished: true,
    logo: null,
  });

  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    if (initialData) {
      setFormData({
        degree: initialData.degree || "",
        specialization:
          initialData.specialization || "",
        institution:
          initialData.institution || "",
        university:
          initialData.university || "",
        location:
          initialData.location || "",
        startDate:
          initialData.startDate
            ? initialData.startDate.slice(0, 10)
            : "",
        endDate:
          initialData.endDate
            ? initialData.endDate.slice(0, 10)
            : "",
        cgpa: initialData.cgpa || "",
        description:
          initialData.description || "",
        achievements: Array.isArray(
          initialData.achievements
        )
          ? initialData.achievements.join(", ")
          : "",
        featured:
          initialData.featured || false,
        isPublished:
          initialData.isPublished ?? true,
        logo: null,
      });

      setPreview(
        initialData.logo?.url || ""
      );
    } else {
      setFormData({
        degree: "",
        specialization: "",
        institution: "",
        university: "",
        location: "",
        startDate: "",
        endDate: "",
        cgpa: "",
        description: "",
        achievements: "",
        featured: false,
        isPublished: true,
        logo: null,
      });

      setPreview("");
    }
  }, [initialData, isOpen]);

  function handleChange(e) {
    const {
      name,
      value,
      checked,
      type,
    } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  }

  function handleImage(e) {
    const file = e.target.files[0];

    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      logo: file,
    }));

    setPreview(
      URL.createObjectURL(file)
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
const payload = {
  ...formData,
  achievements: formData.achievements
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean),
};

    onSubmit(payload);
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6">
      <div className="max-h-[95vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-slate-900 shadow-2xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b border-slate-700 p-6">
          <h2 className="text-2xl font-bold text-white">
            {initialData
              ? "Edit Education"
              : "Add Education"}
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            <FaTimes />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 p-8"
        >
          {/* Degree */}

          <div>
            <label className="mb-2 block text-slate-300">
              Degree
            </label>

            <input
              type="text"
              name="degree"
              required
              value={formData.degree}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white"
            />
          </div>

          {/* Specialization */}

          <div>
            <label className="mb-2 block text-slate-300">
              Specialization
            </label>

            <input
              type="text"
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white"
            />
          </div>

          {/* Institution */}

          <div>
            <label className="mb-2 block text-slate-300">
              Institution
            </label>

            <input
              type="text"
              name="institution"
              required
              value={formData.institution}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white"
            />
          </div>

          {/* University */}

          <div>
            <label className="mb-2 block text-slate-300">
              University
            </label>

            <input
              type="text"
              name="university"
              value={formData.university}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white"
            />
          </div>

          {/* Location */}

          <div>
            <label className="mb-2 block text-slate-300">
              Location
            </label>

            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white"
            />
          </div>

          {/* Dates */}

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-slate-300">
                Start Date
              </label>

              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white"
              />
            </div>

            <div>
              <label className="mb-2 block text-slate-300">
                End Date
              </label>

              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white"
              />
            </div>
          </div>

          {/* CGPA */}

          <div>
            <label className="mb-2 block text-slate-300">
              CGPA
            </label>

            <input
              type="text"
              name="cgpa"
              value={formData.cgpa}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white"
            />
          </div>

          {/* Description */}

          <div>
            <label className="mb-2 block text-slate-300">
              Description
            </label>

            <textarea
              rows={4}
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white"
            />
          </div>

          {/* Achievements */}

          <div>
            <label className="mb-2 block text-slate-300">
              Achievements
            </label>

           <textarea
  rows={5}
  name="achievements"
  placeholder={`Rank Holder
Scholarship
Gold Medal
Best Student`}
  value={formData.achievements}
  onChange={handleChange}
  className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white"
/>
          </div>

          {/* Checkboxes */}

          <div className="grid gap-4 md:grid-cols-2">
            <label className="flex items-center gap-3 rounded-xl bg-slate-800 p-4">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
              />

              <span className="text-white">
                Featured
              </span>
            </label>

            <label className="flex items-center gap-3 rounded-xl bg-slate-800 p-4">
              <input
                type="checkbox"
                name="isPublished"
                checked={formData.isPublished}
                onChange={handleChange}
              />

              <span className="text-white">
                Published
              </span>
            </label>
          </div>

          {/* Logo */}

          <div>
            <label className="mb-3 block text-slate-300">
              Institution Logo
            </label>

            <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-700 bg-slate-800 p-8">
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="h-28 w-28 rounded-xl object-cover"
                />
              ) : (
                <>
                  <FaImage className="mb-3 text-5xl text-slate-500" />

                  <p className="text-slate-400">
                    Upload Logo
                  </p>
                </>
              )}

              <input
                type="file"
                accept="image/*"
                onChange={handleImage}
                className="hidden"
              />
            </label>
          </div>

          {/* Footer */}

          <div className="flex justify-end gap-4 border-t border-slate-700 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl bg-slate-700 px-6 py-3 text-white"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-cyan-500 px-8 py-3 font-semibold text-white hover:bg-cyan-400"
            >
              {loading
                ? "Saving..."
                : initialData
                ? "Update Education"
                : "Create Education"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EducationModal;