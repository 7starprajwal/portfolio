import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { getAdminSettings } from "../services/adminSettingService";

const SettingsContext = createContext(null);

export function SettingsProvider({
  children,
}) {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSettings();
  }, []);

  async function fetchSettings() {
    try {
      setLoading(true);

      const response =
        await getAdminSettings();

      setSettings(response.settings);
    } catch (error) {
      console.error(
        "Failed to load settings:",
        error
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <SettingsContext.Provider
      value={{
        settings,
        loading,
        refreshSettings: fetchSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context =
    useContext(SettingsContext);

  if (!context) {
    throw new Error(
      "useSettings must be used inside SettingsProvider."
    );
  }

  return context;
}