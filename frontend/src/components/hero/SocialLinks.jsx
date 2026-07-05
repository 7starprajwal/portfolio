import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaYoutube,
  FaFacebook,
  FaDiscord,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiLeetcode } from "react-icons/si";
import { MdEmail } from "react-icons/md";

import { useSettings } from "../../context/SettingsContext";

function SocialLinks() {
  const { settings } = useSettings();

  const social = settings?.social || {};

  const socialLinks = [
    {
      icon: <FaGithub />,
      url: social.github,
      label: "GitHub",
    },
    {
      icon: <FaLinkedin />,
      url: social.linkedin,
      label: "LinkedIn",
    },
    {
      icon: <FaInstagram />,
      url: social.instagram,
      label: "Instagram",
    },
    {
      icon: <SiLeetcode />,
      url: social.leetcode,
      label: "LeetCode",
    },
    {
      icon: <FaXTwitter />,
      url: social.twitter,
      label: "Twitter / X",
    },
    {
      icon: <FaYoutube />,
      url: social.youtube,
      label: "YouTube",
    },
    {
      icon: <FaFacebook />,
      url: social.facebook,
      label: "Facebook",
    },
    {
      icon: <FaDiscord />,
      url: social.discord
        ? `https://discord.com/users/${social.discord}`
        : "",
      label: "Discord",
    },
    {
      icon: <MdEmail />,
      url: social.email
        ? `mailto:${social.email}`
        : "",
      label: "Email",
    },
  ];

  return (
    <div className="mt-10 flex flex-wrap justify-center gap-5 md:justify-start">
      {socialLinks
        .filter((item) => item.url)
        .map((item) => (
          <a
            key={item.label}
            href={item.url}
            target={
              item.url.startsWith("mailto:")
                ? undefined
                : "_blank"
            }
            rel={
              item.url.startsWith("mailto:")
                ? undefined
                : "noopener noreferrer"
            }
            aria-label={item.label}
            title={item.label}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-cyan-500 text-xl text-cyan-400 transition-all duration-300 hover:-translate-y-1 hover:bg-cyan-500 hover:text-white hover:shadow-lg hover:shadow-cyan-500/40"
          >
            {item.icon}
          </a>
        ))}
    </div>
  );
}

export default SocialLinks;