import { motion } from "framer-motion";
import {
  FaCalendarAlt,
  FaExternalLinkAlt,
  FaBuilding,
} from "react-icons/fa";

function CertificateCard({
  certificate,
  onView,
}) {
  const image =
    certificate.image?.url ||
    certificate.thumbnail ||
    "/certificate-placeholder.png";

  const issueDate = certificate.issueDate
    ? new Date(
        certificate.issueDate
      ).toLocaleDateString("en-IN", {
        month: "short",
        year: "numeric",
      })
    : "N/A";

  return (
    <motion.article
      layout
      whileHover={{
        y: -8,
        scale: 1.02,
      }}
      transition={{
        duration: 0.25,
      }}
      className="group overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-lg"
    >
      {/* Certificate Image */}
      <div
        className="cursor-pointer overflow-hidden"
        onClick={() => onView(certificate)}
      >
        <img
          src={image}
          alt={certificate.title}
          className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className="space-y-4 p-6">
        {certificate.category && (
          <span className="inline-block rounded-full bg-cyan-500/10 px-3 py-1 text-sm font-medium text-cyan-400">
            {certificate.category}
          </span>
        )}

        {/* Clickable Certificate Title */}
        <h3
          onClick={() => onView(certificate)}
          className="line-clamp-2 cursor-pointer text-2xl font-bold text-white transition-colors duration-300 hover:text-cyan-400"
        >
          {certificate.title}
        </h3>

        <div className="flex items-center gap-2 text-slate-400">
          <FaBuilding />
          <span>{certificate.issuer}</span>
        </div>

        <div className="flex items-center gap-2 text-slate-500">
          <FaCalendarAlt />
          <span>{issueDate}</span>
        </div>

        <button
          onClick={() => onView(certificate)}
          className="flex w-full items-center justify-center gap-3 rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-white transition hover:bg-cyan-400"
        >
          <FaExternalLinkAlt />
          View Certificate
        </button>
      </div>
    </motion.article>
  );
}

export default CertificateCard;