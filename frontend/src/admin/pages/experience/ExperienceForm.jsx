import { useEffect, useState } from "react";

const initialForm = {
  jobTitle: "",
  companyName: "",
  employmentType: "Internship",
  location: "",
  description: "",
  technologies: "",
  responsibilities: "",
  achievements: "",
  startDate: "",
  endDate: "",
  currentJob: false,
  featured: false,
  published: true,
  order: 0,
  companyLogo: null,
};

function ExperienceForm({
  onSubmit,
  initialData = null,
  loading = false,
}) {
  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    if (!initialData) {
      setFormData(initialForm);
      return;
    }

    setFormData({
      ...initialForm,
      ...initialData,

      technologies: Array.isArray(initialData.technologies)
        ? initialData.technologies.join(", ")
        : "",

      responsibilities: Array.isArray(
        initialData.responsibilities
      )
        ? initialData.responsibilities.join("\n")
        : "",

      achievements: Array.isArray(
        initialData.achievements
      )
        ? initialData.achievements.join("\n")
        : "",

      startDate: initialData.startDate
        ? initialData.startDate.substring(0, 10)
        : "",

      endDate: initialData.endDate
        ? initialData.endDate.substring(0, 10)
        : "",

      companyLogo: null,
    });
  }, [initialData]);

  const handleChange = (event) => {
  const { name, value, checked, type, files } =
    event.target;

  if (type === "file") {
    setFormData((prev) => ({
      ...prev,
      companyLogo: files[0],
    }));
    return;
  }

  if (name === "currentJob") {
    setFormData((prev) => ({
      ...prev,
      currentJob: checked,
      endDate: checked ? "" : prev.endDate,
    }));
    return;
  }

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

    const data = new FormData();

    data.append("jobTitle", formData.jobTitle);
    data.append("companyName", formData.companyName);
    data.append(
      "employmentType",
      formData.employmentType
    );
    data.append("location", formData.location);
    data.append("description", formData.description);
    data.append("startDate", formData.startDate);
    data.append("endDate", formData.endDate);
    data.append("currentJob", formData.currentJob);
    data.append("featured", formData.featured);
    data.append("published", formData.published);
    data.append("order", formData.order);

    data.append(
      "technologies",
      JSON.stringify(
        formData.technologies
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean)
      )
    );

    data.append(
      "responsibilities",
      JSON.stringify(
        formData.responsibilities
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean)
      )
    );

    data.append(
      "achievements",
      JSON.stringify(
        formData.achievements
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean)
      )
    );

    if (formData.companyLogo) {
      data.append(
        "companyLogo",
        formData.companyLogo
      );
    }

    onSubmit(data);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-xl bg-slate-900 p-6"
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-white">
            Job Title
          </label>

          <input
            type="text"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-cyan-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-white">
            Company Name
          </label>

          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-cyan-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-white">
            Employment Type
          </label>

          <select
            name="employmentType"
            value={formData.employmentType}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white"
          >
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Internship</option>
            <option>Freelance</option>
            <option>Contract</option>
            <option>Remote</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-white">
            Location
          </label>

          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-cyan-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-white">
            Company Logo
          </label>

          <input
            type="file"
            accept="image/*"
            name="companyLogo"
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white"
          />
        </div>

        <div>
          <label className="mb-2 block text-white">
            Display Order
          </label>

          <input
            type="number"
            min="0"
            name="order"
            value={formData.order}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white"
          />
        </div>

        <div>
          <label className="mb-2 block text-white">
            Start Date
          </label>

          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white"
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
            disabled={formData.currentJob}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white disabled:opacity-50"
          />
        </div>
         </div>  
              <label className="flex items-center gap-3 text-white">
        <input
          type="checkbox"
          name="currentJob"
          checked={formData.currentJob}
          onChange={handleChange}
          className="h-4 w-4"
        />
        Currently Working Here
      </label>

      <label className="flex items-center gap-3 text-white">
        <input
          type="checkbox"
          name="featured"
          checked={formData.featured}
          onChange={handleChange}
          className="h-4 w-4"
        />
        Featured Experience
      </label>

      <label className="flex items-center gap-3 text-white">
        <input
          type="checkbox"
          name="published"
          checked={formData.published}
          onChange={handleChange}
          className="h-4 w-4"
        />
        Published
      </label>

      <div>
        <label className="mb-2 block text-white">
          Technologies
        </label>

        <input
          type="text"
          name="technologies"
          value={formData.technologies}
          onChange={handleChange}
          placeholder="React, Node.js, Express, MongoDB"
          className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-cyan-500"
        />

        <p className="mt-1 text-sm text-slate-400">
          Separate technologies with commas.
        </p>
      </div>

      <div>
        <label className="mb-2 block text-white">
          Responsibilities
        </label>

        <textarea
          rows={5}
          name="responsibilities"
          value={formData.responsibilities}
          onChange={handleChange}
          placeholder="One responsibility per line"
          className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-cyan-500"
        />

        <p className="mt-1 text-sm text-slate-400">
          Enter one responsibility per line.
        </p>
      </div>

      <div>
        <label className="mb-2 block text-white">
          Achievements
        </label>

        <textarea
          rows={5}
          name="achievements"
          value={formData.achievements}
          onChange={handleChange}
          placeholder="One achievement per line"
          className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-cyan-500"
        />

        <p className="mt-1 text-sm text-slate-400">
          Enter one achievement per line.
        </p>
      </div>

      <div>
        <label className="mb-2 block text-white">
          Description
        </label>

        <textarea
          rows={6}
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe your role and contributions..."
          className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-cyan-500"
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-cyan-500 px-8 py-3 font-semibold text-white transition hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading
            ? "Saving..."
            : initialData
            ? "Update Experience"
            : "Save Experience"}
        </button>
      </div>
    </form>
  );
}

export default ExperienceForm;