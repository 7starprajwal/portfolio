import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { fadeRight } from "../animations/fadeVariants";
import { getAdminSettings } from "../../services/adminSettingService";

function HeroImage() {
  const [profile, setProfile] = useState(null);
  const [availability, setAvailability] =
    useState(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await getAdminSettings();

      setProfile(response.settings.profile);
      setAvailability(
        response.settings.availability
      );
    } catch (error) {
      console.error(
        "Failed to load profile image:",
        error
      );
    }
  };

  return (
    <motion.div
      variants={fadeRight}
      initial="hidden"
      animate="visible"
      className="flex w-full justify-center md:w-1/2"
    >
      <motion.div
        className="relative"
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Glow */}
        <div className="absolute inset-0 rounded-full bg-cyan-500/20 blur-3xl"></div>

        {/* Profile Image */}
        <div className="relative h-80 w-80 overflow-hidden rounded-full border-4 border-cyan-400 shadow-[0_0_40px_rgba(34,211,238,0.35)]">
          <img
            src={
              profile?.image?.url ||
              "https://via.placeholder.com/320x320?text=Profile"
            }
            alt={profile?.name || "Profile"}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Status Badge */}
        <div
          className={`absolute -right-4 top-4 rounded-full px-4 py-2 text-xs font-semibold text-white shadow-lg ${
            availability?.openToWork
              ? "bg-green-500"
              : "bg-red-500"
          }`}
        >
          {availability?.openToWork
            ? "🟢 Open to Work"
            : "🔴 Not Available"}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default HeroImage;