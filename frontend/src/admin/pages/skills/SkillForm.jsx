import { useEffect, useState } from "react";

const categories = [
  "Frontend",
  "Backend",
  "Database",
  "Programming",
  "Tools",
  "Cloud",
  "Machine Learning",
  "Other",
];

const initialForm = {
  name: "",
  category: "Other",
  level: 80,
  featured: false,
  isPublished: true,
  order: 0,
  icon: null,
};

function SkillForm({
  onSubmit,
  initialData = initialForm,
  loading = false,
}) {
  const [formData, setFormData] = useState(initialData);
  const [preview, setPreview] = useState(
    initialData.icon?.url || ""
  );

  useEffect(() => {
    setFormData({
      ...initialForm,
      ...initialData,
    });

    setPreview(initialData?.icon?.url || "");
  }, [initialData]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "number"
          ? Number(value)
          : value,
    }));
  };

  const handleImage = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      icon: file,
    }));

    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-xl bg-slate-900 p-6"
    >
      <div>
        <label className="mb-2 block text-white">
          Skill Name
        </label>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-cyan-500"
          required
        />
      </div>

      <div>
        <label className="mb-2 block text-white">
          Category
        </label>

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block text-white">
          Skill Level (%)
        </label>

        <input
          type="number"
          name="level"
          min="0"
          max="100"
          value={formData.level}
          onChange={handleChange}
          className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-cyan-500"
          required
        />
      </div>

      <div>
        <label className="mb-2 block text-white">
          Display Order
        </label>

        <input
          type="number"
          name="order"
          min="0"
          value={formData.order}
          onChange={handleChange}
          className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-cyan-500"
        />
      </div>

      <div>
        <label className="mb-2 block text-white">
          Skill Icon
        </label>

        <input
          type="file"
          accept="image/*"
          onChange={handleImage}
          className="block w-full text-white"
        />

        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="mt-4 h-24 w-24 rounded-lg object-cover"
          />
        )}
      </div>

      <div className="flex gap-8">
        <label className="flex items-center gap-2 text-white">
          <input
            type="checkbox"
            name="featured"
            checked={formData.featured}
            onChange={handleChange}
          />
          Featured
        </label>

        <label className="flex items-center gap-2 text-white">
          <input
            type="checkbox"
            name="isPublished"
            checked={formData.isPublished}
            onChange={handleChange}
          />
          Published
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="rounded-lg bg-cyan-500 px-6 py-3 font-semibold text-white transition hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save Skill"}
      </button>
    </form>
  );
}

export default SkillForm;
