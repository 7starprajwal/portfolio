import {
  FaUser,
  FaGraduationCap,
  FaMapMarkerAlt,
  FaUniversity,
  FaBriefcase,
  FaChartBar,
} from "react-icons/fa";

function AboutSettings({
  settings,
  setSettings,
}) {
  const about = settings?.about || {};

  const handleChange = (event) => {
    const { name, value } = event.target;

    setSettings((prev) => ({
      ...prev,
      about: {
        ...prev.about,
        [name]: value,
      },
    }));
  };

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-lg">
      {/* Header */}
      <div className="mb-10">
        <h2 className="flex items-center gap-3 text-3xl font-bold text-white">
          <FaUser className="text-cyan-400" />
          About Section
        </h2>

        <p className="mt-2 text-slate-400">
          Manage your About section details.
        </p>
      </div>

      <div className="grid gap-6">
        {/* Title */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            About Title
          </label>

          <input
            type="text"
            name="title"
            value={about.title || ""}
            onChange={handleChange}
            placeholder="About Me"
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-5 py-3 text-white outline-none focus:border-cyan-500"
          />
        </div>

        {/* Description */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Description
          </label>

          <textarea
            rows={6}
            name="description"
            value={about.description || ""}
            onChange={handleChange}
            placeholder="Tell visitors about yourself..."
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-5 py-3 text-white outline-none focus:border-cyan-500"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Degree */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm text-slate-300">
              <FaGraduationCap />
              Degree
            </label>

            <input
              type="text"
              name="degree"
              value={about.degree || ""}
              onChange={handleChange}
              placeholder="B.E Computer Science"
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-5 py-3 text-white outline-none focus:border-cyan-500"
            />
          </div>

          {/* Location */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm text-slate-300">
              <FaMapMarkerAlt />
              Location
            </label>

            <input
              type="text"
              name="location"
              value={about.location || ""}
              onChange={handleChange}
              placeholder="Bengaluru, Karnataka"
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-5 py-3 text-white outline-none focus:border-cyan-500"
            />
          </div>

          {/* University */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm text-slate-300">
              <FaUniversity />
              University / College
            </label>

            <input
              type="text"
              name="university"
              value={about.university || ""}
              onChange={handleChange}
              placeholder="Sri Siddhartha Institute of Engineering"
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-5 py-3 text-white outline-none focus:border-cyan-500"
            />
          </div>

          {/* Availability */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm text-slate-300">
              <FaBriefcase />
              Availability Text
            </label>

            <input
              type="text"
              name="availabilityText"
              value={about.availabilityText || ""}
              onChange={handleChange}
              placeholder="Open to Work"
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-5 py-3 text-white outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        {/* Statistics */}
        <div className="mt-4">
          <h3 className="mb-5 flex items-center gap-2 text-xl font-semibold text-white">
            <FaChartBar className="text-cyan-400" />
            About Statistics
          </h3>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="mb-2 block text-sm text-slate-300">
                Experience (Years)
              </label>

              <input
                type="number"
                name="experience"
                value={about.experience || 0}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-5 py-3 text-white outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-300">
                Projects
              </label>

              <input
                type="number"
                name="projects"
                value={about.projects || 0}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-5 py-3 text-white outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-300">
                Technologies
              </label>

              <input
                type="number"
                name="technologies"
                value={about.technologies || 0}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-5 py-3 text-white outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-300">
                Certificates
              </label>

              <input
                type="number"
                name="certificates"
                value={about.certificates || 0}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-5 py-3 text-white outline-none focus:border-cyan-500"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSettings;