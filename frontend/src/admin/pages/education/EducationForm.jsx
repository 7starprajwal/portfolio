import { useEffect, useState } from "react";

const initialForm = {
  institution: "",
  degree: "",
  fieldOfStudy: "",
  startDate: "",
  endDate: "",
  currentlyStudying: false,
  grade: "",
  description: "",
  order: 0,
  isPublished: true,
};

function EducationForm({
  onSubmit,
  initialData = initialForm,
  loading = false,
}) {
  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    setFormData({
      ...initialForm,
      ...initialData,
      startDate: initialData?.startDate
        ? initialData.startDate.substring(0, 10)
        : "",
      endDate: initialData?.endDate
        ? initialData.endDate.substring(0, 10)
        : "",
    });
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
          Institution
        </label>

        <input
          type="text"
          name="institution"
          value={formData.institution}
          onChange={handleChange}
          className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-cyan-500"
          required
        />
      </div>

      <div>
        <label className="mb-2 block text-white">
          Degree
        </label>

        <input
          type="text"
          name="degree"
          value={formData.degree}
          onChange={handleChange}
          className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-cyan-500"
          required
        />
      </div>

      <div>
        <label className="mb-2 block text-white">
          Field of Study
        </label>

        <input
          type="text"
          name="fieldOfStudy"
          value={formData.fieldOfStudy}
          onChange={handleChange}
          className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-cyan-500"
        />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-white">
            Start Date
          </label>

          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-white">
            End Date
          </label>

          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            disabled={formData.currentlyStudying}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white disabled:opacity-50"
          />
        </div>
      </div>

      <div>
        <label className="flex items-center gap-2 text-white">
          <input
            type="checkbox"
            name="currentlyStudying"
            checked={formData.currentlyStudying}
            onChange={handleChange}
          />
          Currently Studying
        </label>
      </div>

      <div>
        <label className="mb-2 block text-white">
          Grade / CGPA
        </label>

        <input
          type="text"
          name="grade"
          value={formData.grade}
          onChange={handleChange}
          className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-cyan-500"
        />
      </div>

      <div>
        <label className="mb-2 block text-white">
          Description
        </label>

        <textarea
          rows="4"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-cyan-500"
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
        {loading ? "Saving..." : "Save Education"}
      </button>
    </form>
  );
}

export default EducationForm;