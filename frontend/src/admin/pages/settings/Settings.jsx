import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import ProfileSettings from "../../components/settings/ProfileSettings";
import PortfolioSettings from "../../components/settings/PortfolioSettings";
import AboutSettings from "../../components/settings/AboutSettings";
import SocialSettings from "../../components/settings/SocialSettings";
import AvailabilitySettings from "../../components/settings/AvailabilitySettings";
import PasswordSettings from "../../components/settings/PasswordSettings";

import {
  getAdminSettings,
  updateAdminSettings,
} from "../../services/adminSettingService";

function Settings() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);

      const response = await getAdminSettings();

      setSettings(response.settings);
    } catch (error) {
      console.error(error);

      toast.error("Failed to load settings.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      await updateAdminSettings(settings);

      toast.success("Settings updated successfully.");
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to save settings."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-14 w-14 animate-spin rounded-full border-4 border-cyan-500 border-t-transparent" />

          <p className="mt-6 text-lg text-slate-300">
            Loading Settings...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
        <div>
          <h1 className="text-4xl font-bold text-white">
            Settings
          </h1>

          <p className="mt-2 text-slate-400">
            Manage your portfolio settings.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="rounded-xl bg-cyan-500 px-8 py-3 font-semibold text-white transition hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {saving
            ? "Saving..."
            : "Save All Changes"}
        </button>
      </div>

      <ProfileSettings
        settings={settings}
        setSettings={setSettings}
      />

      <PortfolioSettings
        settings={settings}
        setSettings={setSettings}
      />

      <AboutSettings
        settings={settings}
        setSettings={setSettings}
      />

      <SocialSettings
        settings={settings}
        setSettings={setSettings}
      />

      <AvailabilitySettings
        settings={settings}
        setSettings={setSettings}
      />

      <PasswordSettings />
    </div>
  );
}

export default Settings;