import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";

import { MdEmail } from "react-icons/md";

function SocialLinks() {
  const socialLinks = [
    {
      icon: <FaGithub />,
      url: "https://github.com/7starprajwal",
      label: "GitHub",
    },
    {
      icon: <FaLinkedin />,
      url: "https://www.linkedin.com/in/prajwal-s-55367731b/",
      label: "LinkedIn",
    },
    {
      icon: <FaInstagram />,
      url: "https://www.instagram.com/seven_star_prj/",
      label: "Instagram",
    },
    {
      icon: "LC",
      url: "https://leetcode.com/u/prajwal_s_2026/",
      label: "LeetCode",
    },
    {
      icon: <FaWhatsapp />,
      url: "https://wa.me/919036512779",
      label: "WhatsApp",
    },
    {
      icon: <MdEmail />,
      url: "mailto:7starprajwal1718@gmail.com",
      label: "Email",
    },
  ];

  return (
    <div className="mt-10 flex flex-wrap justify-center gap-5 md:justify-start">
      {socialLinks.map((item) => (
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
          className="flex h-12 w-12 items-center justify-center rounded-full border border-cyan-500 text-xl text-cyan-400 transition-all duration-300 hover:-translate-y-1 hover:bg-cyan-500 hover:text-white hover:shadow-lg hover:shadow-cyan-500/40"
        >
          {item.icon}
        </a>
      ))}
    </div>
  );
}

export default SocialLinks;