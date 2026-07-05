import { useEffect, useState } from "react";
import { FaImage, FaTimes } from "react-icons/fa";

function ProjectModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  loading,
}) {
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    shortDescription: "",
    description: "",
    technologies: "",
    githubUrl: "",
    liveUrl: "",
    category: "Full Stack",
    featured: false,
    isPublished: true,
    image: null,
  });

  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    if (initialData) {
      setFormData({
        title: initialData.title || "",
        slug: initialData.slug || "",
        shortDescription:
          initialData.shortDescription || "",
        description:
          initialData.description || "",
        technologies: Array.isArray(
          initialData.technologies
        )
          ? initialData.technologies.join(", ")
          : "",
        githubUrl:
          initialData.githubUrl || "",
        liveUrl:
          initialData.liveUrl || "",
        category:
          initialData.category || "Full Stack",
        featured:
          initialData.featured || false,
        isPublished:
          initialData.isPublished ?? true,
        image: null,
      });

      setPreview(initialData.image?.url || "");
    } else {
      setFormData({
        title: "",
        slug: "",
        shortDescription: "",
        description: "",
        technologies: "",
        githubUrl: "",
        liveUrl: "",
        category: "Full Stack",
        featured: false,
        isPublished: true,
        image: null,
      });

      setPreview("");
    }
  }, [initialData, isOpen]);

  function createSlug(text) {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  }

  function handleChange(e) {
    const { name, value, type, checked } =
      e.target;

    if (name === "title") {
      setFormData((prev) => ({
        ...prev,
        title: value,
        slug: createSlug(value),
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  }

  function handleImageChange(e) {
    const file = e.target.files[0];

    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      image: file,
    }));

    setPreview(URL.createObjectURL(file));
  }

  function handleSubmit(e) {
    e.preventDefault();

    onSubmit({
      ...formData,
      technologies: formData.technologies
        .split(",")
        .map((tech) => tech.trim())
        .filter(Boolean),
    });
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6">
      <div className="max-h-[95vh] w-full max-w-5xl overflow-y-auto rounded-2xl bg-slate-900 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-700 p-6">
          <h2 className="text-2xl font-bold text-white">
            {initialData
              ? "Edit Project"
              : "Add Project"}
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            <FaTimes size={20} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 p-8"
        >
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-slate-300">
                Project Title
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white"
              />
            </div>

            <div>
              <label className="mb-2 block text-slate-300">
                Slug
              </label>

              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white"
              />
            </div>
          </div>

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
              <option>Full Stack</option>
              <option>Frontend</option>
              <option>Backend</option>
              <option>Machine Learning</option>
              <option>Python</option>
              <option>Java</option>
              <option>C++</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-slate-300">
              Short Description
            </label>

            <textarea
              rows={3}
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-slate-300">
              Full Description
            </label>

            <textarea
              rows={6}
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-slate-300">
              Technologies
            </label>

            <input
              type="text"
              name="technologies"
              value={formData.technologies}
              onChange={handleChange}
              placeholder="React, Node.js, MongoDB"
              className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white"
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <input
              type="url"
              name="githubUrl"
              value={formData.githubUrl}
              onChange={handleChange}
              placeholder="GitHub URL"
              className="rounded-xl border border-slate-700 bg-slate-800 p-3 text-white"
            />

            <input
              type="url"
              name="liveUrl"
              value={formData.liveUrl}
              onChange={handleChange}
              placeholder="Live Demo URL"
              className="rounded-xl border border-slate-700 bg-slate-800 p-3 text-white"
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
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

          <div>
            <label className="mb-2 block text-slate-300">
              Project Image
            </label>

            <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-700 bg-slate-800 p-8">
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="max-h-60 rounded-lg"
                />
              ) : (
                <>
                  <FaImage className="mb-3 text-5xl text-slate-500" />

                  <p className="text-slate-400">
                    Click to upload image
                  </p>
                </>
              )}

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>

          <div className="flex justify-end gap-4">
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
              className="rounded-xl bg-cyan-500 px-8 py-3 text-white"
            >
              {loading
                ? "Saving..."
                : initialData
                ? "Update Project"
                : "Create Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProjectModal;