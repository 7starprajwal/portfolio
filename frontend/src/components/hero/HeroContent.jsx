import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { fadeLeft } from "../animations/fadeVariants";

import HeroButtons from "./HeroButtons";
import SocialLinks from "./SocialLinks";
import HeroTyping from "./HeroTyping";

import { getAdminSettings } from "../../services/adminSettingService";

function HeroContent() {
  const [profile, setProfile] = useState(null);
  const [portfolio, setPortfolio] = useState(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await getAdminSettings();

      setProfile(response.settings.profile);
      setPortfolio(response.settings.portfolio);
    } catch (error) {
      console.error("Failed to load hero settings:", error);
    }
  };

  return (
    <motion.div
      variants={fadeLeft}
      initial="hidden"
      animate="visible"
      className="w-full text-center md:w-1/2 md:text-left"
    >
      <p className="mb-3 text-lg font-medium text-cyan-400">
        👋 Hello, I'm
      </p>

      <h1 className="text-5xl font-extrabold leading-tight text-white sm:text-6xl">
        {profile?.name || "Loading..."}
      </h1>

      <HeroTyping />

      <p className="mt-6 max-w-xl text-lg leading-8 text-slate-400">
        {portfolio?.heroDescription ||
          "Loading portfolio description..."}
      </p>

      <HeroButtons />

      <SocialLinks />
    </motion.div>
  );
}

export default HeroContent;