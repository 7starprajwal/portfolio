import { useEffect, useState } from "react";
import {
  FaImage,
  FaTimes,
} from "react-icons/fa";

function SkillModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  loading,
}) {
 const [formData, setFormData] = useState({
  name: "",
  category: "Frontend",
  level: 80,
  description: "",
  experience: "",
  technologies: "",
  projects: "",
  color: "#06b6d4",
  featured: false,
  isPublished: true,
  icon: null,
});
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    if (initialData) {
     setFormData({
  name: initialData.name || "",
  category: initialData.category || "Frontend",
  level: initialData.level || 80,
  description: initialData.description || "",
  experience: initialData.experience || "",
  technologies: Array.isArray(initialData.technologies)
    ? initialData.technologies.join(", ")
    : "",
  projects: Array.isArray(initialData.projects)
    ? initialData.projects.join(", ")
    : "",
  color: initialData.color || "#06b6d4",
  featured: initialData.featured || false,
  isPublished: initialData.isPublished ?? true,
  icon: null,
});
      setPreview(
        initialData.icon?.url || ""
      );
    } else {
      setFormData({
  name: "",
  category: "Frontend",
  level: 80,
  description: "",
  experience: "",
  technologies: "",
  projects: "",
  color: "#06b6d4",
  featured: false,
  isPublished: true,
  icon: null,
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
      icon: file,
    }));

    setPreview(
      URL.createObjectURL(file)
    );
  }

 function handleSubmit(e) {
  e.preventDefault();

  onSubmit({
    ...formData,

    technologies: formData.technologies
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean),

    projects: formData.projects
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean),
  });
}

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6">
      <div className="max-h-[95vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-slate-900 shadow-2xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b border-slate-700 p-6">
          <h2 className="text-2xl font-bold text-white">
            {initialData
              ? "Edit Skill"
              : "Add Skill"}
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
          {/* Skill Name */}

          <div>
            <label className="mb-2 block text-slate-300">
              Skill Name
            </label>

            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white"
            />
          </div>

          {/* Category */}

          <div>
            <label className="mb-2 block text-slate-300">
              Category
            </label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white"
            >
              <option>Frontend</option>
              <option>Backend</option>
              <option>Database</option>
              <option>Programming</option>
              <option>Tools</option>
              <option>Cloud</option>
              <option>Machine Learning</option>
              <option>Other</option>
            </select>
          </div>

          {/* Skill Level */}

          <div>
            <label className="mb-2 block text-slate-300">
              Skill Level
            </label>

            <input
              type="range"
              min="0"
              max="100"
              name="level"
              value={formData.level}
              onChange={handleChange}
              className="w-full"
            />

            <p className="mt-2 text-center text-cyan-400">
              {formData.level}%
            </p>
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

{/* Experience */}

<div>
  <label className="mb-2 block text-slate-300">
    Experience
  </label>

  <input
    type="text"
    name="experience"
    placeholder="2 Years"
    value={formData.experience}
    onChange={handleChange}
    className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white"
  />
</div>

{/* Technologies */}

<div>
  <label className="mb-2 block text-slate-300">
    Technologies
  </label>

  <input
    type="text"
    name="technologies"
    placeholder="Spring Boot, Java, Hibernate"
    value={formData.technologies}
    onChange={handleChange}
    className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white"
  />
</div>

{/* Projects */}

<div>
  <label className="mb-2 block text-slate-300">
    Related Projects
  </label>

  <input
    type="text"
    name="projects"
    placeholder="Hospital Management, Portfolio"
    value={formData.projects}
    onChange={handleChange}
    className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white"
  />
</div>

          {/* Color */}

          <div>
            <label className="mb-2 block text-slate-300">
              Progress Color
            </label>

            <input
              type="color"
              name="color"
              value={formData.color}
              onChange={handleChange}
              className="h-12 w-20 cursor-pointer rounded-lg border border-slate-700 bg-slate-800"
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

          {/* Icon */}

          <div>
            <label className="mb-3 block text-slate-300">
              Skill Icon
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
                    Upload Skill Icon
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
                ? "Update Skill"
                : "Create Skill"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SkillModal;