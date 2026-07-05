import {
  FaBriefcase,
  FaChartBar,
  FaCheckCircle,
} from "react-icons/fa";

function AvailabilitySettings({
  settings,
  setSettings,
}) {
  const availability =
    settings?.availability || {};

  const handleToggle = () => {
    setSettings((prev) => ({
      ...prev,
      availability: {
        ...prev.availability,
        openToWork:
          !prev.availability.openToWork,
      },
    }));
  };

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-lg">
      {/* Header */}
      <div className="mb-10">
        <h2 className="flex items-center gap-3 text-3xl font-bold text-white">
          <FaBriefcase className="text-cyan-400" />
          Availability & Portfolio Status
        </h2>

        <p className="mt-2 text-slate-400">
          Manage your portfolio visibility and
          availability.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Availability */}

        <div className="rounded-2xl border border-slate-800 bg-slate-800/40 p-6">
          <h3 className="mb-6 text-xl font-semibold text-white">
            Availability
          </h3>

          <label className="flex cursor-pointer items-center justify-between rounded-xl border border-slate-700 bg-slate-900 px-5 py-4">
            <div>
              <h4 className="font-semibold text-white">
                Open To Work
              </h4>

              <p className="mt-1 text-sm text-slate-400">
                Display your availability on the
                portfolio.
              </p>
            </div>

            <input
              type="checkbox"
              checked={
                availability.openToWork || false
              }
              onChange={handleToggle}
              className="h-5 w-5 accent-cyan-500"
            />
          </label>
        </div>

        {/* Info */}

        <div className="rounded-2xl border border-slate-800 bg-slate-800/40 p-6">
          <h3 className="mb-6 flex items-center gap-3 text-xl font-semibold text-white">
            <FaChartBar className="text-cyan-400" />
            Portfolio Status
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-xl border border-slate-700 bg-slate-900 px-5 py-4">
              <span className="text-slate-300">
                Portfolio
              </span>

              <span className="flex items-center gap-2 text-green-400">
                <FaCheckCircle />
                Active
              </span>
            </div>

            <div className="flex items-center justify-between rounded-xl border border-slate-700 bg-slate-900 px-5 py-4">
              <span className="text-slate-300">
                Current Status
              </span>

              <span
                className={
                  availability.openToWork
                    ? "font-semibold text-green-400"
                    : "font-semibold text-red-400"
                }
              >
                {availability.openToWork
                  ? "Open To Work"
                  : "Not Available"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AvailabilitySettings;