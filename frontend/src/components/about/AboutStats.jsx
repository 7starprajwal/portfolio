import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { getAdminSettings } from "../../services/adminSettingService";

function AboutStats() {
  const [about, setAbout] = useState(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await getAdminSettings();

      setAbout(response.settings.about);
    } catch (error) {
      console.error(
        "Failed to load about statistics:",
        error
      );
    }
  };

  const stats = [
    {
      value: `${about?.experience || 0}+`,
      label: "Years Experience",
    },
    {
      value: `${about?.projects || 0}+`,
      label: "Projects",
    },
    {
      value: `${about?.technologies || 0}+`,
      label: "Technologies",
    },
    {
      value: `${about?.certificates || 0}+`,
      label: "Certificates",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
    >
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-2xl border border-slate-700 bg-slate-950 p-8 text-center transition hover:border-cyan-400"
        >
          <h3 className="text-4xl font-bold text-cyan-400">
            {stat.value}
          </h3>

          <p className="mt-3 text-slate-400">
            {stat.label}
          </p>
        </div>
      ))}
    </motion.div>
  );
}

export default AboutStats;