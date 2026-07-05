import { FaGlobe } from "react-icons/fa";

function PortfolioSettings({
  settings,
  setSettings,
}) {
  const portfolio = settings?.portfolio || {};

  const handleChange = (event) => {
    const { name, value } = event.target;

    setSettings((prev) => ({
      ...prev,
      portfolio: {
        ...prev.portfolio,
        [name]: value,
      },
    }));
  };

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-lg">
      {/* Header */}
      <div className="mb-10">
        <h2 className="flex items-center gap-3 text-3xl font-bold text-white">
          <FaGlobe className="text-cyan-400" />
          Portfolio Information
        </h2>

        <p className="mt-2 text-slate-400">
          Configure the information displayed throughout your portfolio.
        </p>
      </div>

      <div className="grid gap-6">
        {/* Portfolio Name */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Portfolio Name
          </label>

          <input
            type="text"
            name="portfolioName"
            value={portfolio.portfolioName || ""}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-5 py-3 text-white outline-none transition focus:border-cyan-500"
          />
        </div>

        {/* Hero Title */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Hero Title
          </label>

          <input
            type="text"
            name="heroTitle"
            value={portfolio.heroTitle || ""}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-5 py-3 text-white outline-none transition focus:border-cyan-500"
          />
        </div>

        {/* Hero Description */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Hero Description
          </label>

          <textarea
            rows={6}
            name="heroDescription"
            value={portfolio.heroDescription || ""}
            onChange={handleChange}
            className="w-full resize-none rounded-xl border border-slate-700 bg-slate-800 px-5 py-3 text-white outline-none transition focus:border-cyan-500"
          />
        </div>

        {/* Copyright */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Copyright Text
          </label>

          <input
            type="text"
            name="copyright"
            value={portfolio.copyright || ""}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-5 py-3 text-white outline-none transition focus:border-cyan-500"
          />
        </div>
      </div>
    </section>
  );
}

export default PortfolioSettings;