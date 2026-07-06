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

    console.log("SUCCESS");
    console.log(response);

    setProfile(response.settings.profile);
    setPortfolio(response.settings.portfolio);

    console.log("Profile:", response.settings.profile);
    console.log("Portfolio:", response.settings.portfolio);
  } catch (error) {
    console.log("ERROR");
    console.log(error);
    console.log(error.response);
    console.log(error.message);
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