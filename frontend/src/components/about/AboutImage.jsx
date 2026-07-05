import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { getAdminSettings } from "../../services/adminSettingService";

function AboutImage() {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await getAdminSettings();

      setSettings(response.settings);
    } catch (error) {
      console.error(
        "Failed to load About image:",
        error
      );
    }
  };

  const profile = settings?.profile;

  return (
    <motion.div
      initial={{ opacity: 0, x: -80 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="flex justify-center"
    >
      <div className="relative">
        <img
          src={
            profile?.image?.url ||
            "https://via.placeholder.com/320x320?text=Profile"
          }
          alt={profile?.name || "Profile"}
          className="h-80 w-80 rounded-3xl border-4 border-cyan-400 object-cover shadow-[0_0_35px_rgba(34,211,238,0.35)]"
        />

        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-cyan-500 px-5 py-2 text-sm font-semibold text-white shadow-lg">
          {profile?.role || "Full Stack Developer"}
        </div>
      </div>
    </motion.div>
  );
}

export default AboutImage;