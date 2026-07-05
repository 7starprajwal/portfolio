import { useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";

import { getAdminSettings } from "../../services/adminSettingService";

function HeroTyping() {
  const [heroTitle, setHeroTitle] = useState(
    "Full Stack Developer"
  );

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await getAdminSettings();

      setHeroTitle(
        response.settings.portfolio.heroTitle
      );
    } catch (error) {
      console.error(
        "Failed to load hero title:",
        error
      );
    }
  };

  return (
    <TypeAnimation
      sequence={[
        heroTitle,
        2500,
        "React Developer",
        2000,
        "Java Developer",
        2000,
        "Backend Developer",
        2000,
        "Open to Internship",
        2000,
      ]}
      wrapper="span"
      speed={50}
      repeat={Infinity}
      className="mt-4 block text-2xl font-semibold text-cyan-400"
    />
  );
}

export default HeroTyping;