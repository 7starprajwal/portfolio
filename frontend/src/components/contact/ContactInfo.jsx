import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaWhatsapp,
} from "react-icons/fa";

import { motion } from "framer-motion";

function ContactInfo() {
  const contactInfo = [
    {
      id: 1,
      icon: <FaEnvelope />,
      title: "Email",
      value: "7starprajwal1718@gmail.com",
      href: "mailto:7starprajwal1718@gmail.com",
    },
    {
      id: 2,
      icon: <FaPhoneAlt />,
      title: "Phone",
      value: "+91 9036512779",
      href: "tel:+919036512779",
    },
    {
      id: 3,
      icon: <FaWhatsapp />,
      title: "WhatsApp",
      value: "+91 9036512779",
      href: "https://wa.me/919036512779",
    },
    {
      id: 4,
      icon: <FaMapMarkerAlt />,
      title: "Location",
      value: "Bengaluru, Karnataka, India",
      href: "#",
    },
  ];

  return (
    <div className="space-y-5">
      {contactInfo.map((item) => (
        <motion.a
          key={item.id}
          href={item.href}
          target={item.href.startsWith("http") ? "_blank" : undefined}
          rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
          whileHover={{ y: -5 }}
          className="flex items-center gap-5 rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-lg transition hover:border-cyan-500"
        >
          <div className="rounded-xl bg-cyan-500/10 p-4 text-2xl text-cyan-400">
            {item.icon}
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white">
              {item.title}
            </h3>

            <p className="text-slate-400">
              {item.value}
            </p>
          </div>
        </motion.a>
      ))}
    </div>
  );
}

export default ContactInfo;