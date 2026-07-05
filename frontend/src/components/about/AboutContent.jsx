import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { getAdminSettings } from "../../services/adminSettingService";

function AboutContent() {
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
        "Failed to load About section:",
        error
      );
    }
  };

  const profile = settings?.profile;
  const about = settings?.about;

  return (
    <motion.div
      initial={{ opacity: 0, x: 80 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <p className="mb-3 text-lg font-semibold text-cyan-400">
        {about?.title || "About Me"}
      </p>

      <h2 className="text-4xl font-bold text-white">
        {profile?.name || "Loading..."}
      </h2>

      <h3 className="mt-3 text-2xl text-slate-300">
        {profile?.role || "Developer"}
      </h3>

      <p className="mt-6 text-lg leading-8 text-slate-400">
        {about?.description ||
          "Write something about yourself from the Admin Dashboard."}
      </p>

      <div className="mt-8 grid grid-cols-2 gap-4 text-slate-300">
        <p>
          🎓{" "}
          {about?.degree ||
            "Not specified"}
        </p>

        <p>
          📍{" "}
          {about?.location ||
            "Not specified"}
        </p>

        <p>
          🏫{" "}
          {about?.university ||
            "Not specified"}
        </p>

        <p>
          💼{" "}
          {about?.availabilityText ||
            "Open to Work"}
        </p>
      </div>
    </motion.div>
  );
}

export default AboutContent;