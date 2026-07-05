import { useSettings } from "../../context/SettingsContext";

function Footer() {
  const { settings } = useSettings();

  const profile = settings?.profile || {};
  const portfolio = settings?.portfolio || {};

  return (
    <footer className="border-t border-slate-800 bg-slate-950">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="text-center">
          <p className="text-sm text-slate-400">
            {portfolio.copyright ||
              `© ${new Date().getFullYear()} ${
                profile.name || "Prajwal S"
              }. All Rights Reserved.`}
          </p>

          <p className="mt-2 text-sm text-slate-500">
            Designed &amp; Developed by{" "}
            <span className="font-semibold text-cyan-400">
              {profile.name || "Prajwal S"}
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;