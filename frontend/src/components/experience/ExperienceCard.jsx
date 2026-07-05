import { motion } from "framer-motion";
import {
  FaBuilding,
  FaCalendarAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

function ExperienceCard({ experience, index }) {
  const isLeft = index % 2 === 0;

  const startDate = new Date(
    experience.startDate
  ).toLocaleDateString("en-IN", {
    month: "short",
    year: "numeric",
  });

  const endDate = experience.currentJob
    ? "Present"
    : experience.endDate
    ? new Date(
        experience.endDate
      ).toLocaleDateString("en-IN", {
        month: "short",
        year: "numeric",
      })
    : "";

  return (
    <div
      className={`relative flex w-full ${
        isLeft
          ? "justify-start lg:justify-start"
          : "justify-start lg:justify-end"
      }`}
    >
      {/* Animated Timeline Dot */}
      <motion.div
        animate={{
          scale: [1, 1.25, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-3 top-10 z-20 h-5 w-5 rounded-full border-4 border-slate-950 bg-cyan-400 shadow-[0_0_20px_#22d3ee] lg:left-1/2 lg:-translate-x-1/2"
      />

      <motion.div
        initial={{
          opacity: 0,
          x: isLeft ? -80 : 80,
        }}
        whileInView={{
          opacity: 1,
          x: 0,
        }}
        whileHover={{
          y: -8,
          scale: 1.02,
        }}
        transition={{
          duration: 0.5,
        }}
        viewport={{ once: true }}
        className={`ml-12 w-full rounded-3xl border border-cyan-500/20 bg-slate-900/70 p-8 shadow-2xl backdrop-blur-md transition-all duration-300 hover:border-cyan-400/60 hover:shadow-[0_0_40px_rgba(34,211,238,0.15)] lg:ml-0 lg:w-[46%] ${
          isLeft ? "lg:mr-auto" : "lg:ml-auto"
        }`}
      >
        {/* Header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-5">
            {experience.companyLogo?.url && (
              <motion.img
                src={experience.companyLogo.url}
                alt={experience.companyName}
                whileHover={{
                  rotate: 5,
                  scale: 1.08,
                }}
                transition={{
                  duration: 0.3,
                }}
                className="h-16 w-16 rounded-xl bg-white object-contain p-2 shadow-lg"
              />
            )}

            <div>
              <h3 className="text-2xl font-bold text-white">
                {experience.jobTitle}
              </h3>

              <div className="mt-2 flex items-center gap-2 text-cyan-400">
                <FaBuilding />

                <span>{experience.companyName}</span>
              </div>

              <p className="mt-2 text-sm text-slate-400">
                {experience.employmentType}
              </p>

              {experience.featured && (
                <span className="mt-3 inline-flex items-center rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-4 py-1 text-xs font-bold uppercase tracking-wider text-slate-950 shadow-lg">
                  ★ Featured
                </span>
              )}
            </div>
          </div>

          <div className="space-y-2 text-sm text-slate-300">
            <div className="flex items-center gap-2">
              <FaCalendarAlt />

              <span>
                {startDate} - {endDate}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <FaMapMarkerAlt />

              <span>{experience.location}</span>
            </div>
          </div>
        </div>

        {/* Description */}
        {experience.description && (
          <p className="mt-8 leading-8 text-slate-300">
            {experience.description}
          </p>
        )}

        {/* Responsibilities */}
        {experience.responsibilities?.length > 0 && (
          <div className="mt-8">
            <h4 className="mb-3 text-lg font-semibold text-cyan-400">
              Responsibilities
            </h4>

            <ul className="space-y-3">
              {experience.responsibilities.map(
                (item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-slate-300"
                  >
                    <span className="mt-2 h-2 w-2 rounded-full bg-cyan-400"></span>

                    <span>{item}</span>
                  </li>
                )
              )}
            </ul>
          </div>
        )}

        {/* Achievements */}
        {experience.achievements?.length > 0 && (
          <div className="mt-8">
            <h4 className="mb-3 text-lg font-semibold text-cyan-400">
              Achievements
            </h4>

            <ul className="space-y-3">
              {experience.achievements.map(
                (item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-slate-300"
                  >
                    <span className="mt-2 h-2 w-2 rounded-full bg-cyan-400"></span>

                    <span>{item}</span>
                  </li>
                )
              )}
            </ul>
          </div>
        )}

        {/* Technologies */}
        {experience.technologies?.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-3">
            {experience.technologies.map(
              (tech, index) => (
                <span
                  key={index}
                  className="rounded-full border border-cyan-400/40 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-300 transition-all duration-300 hover:-translate-y-1 hover:bg-cyan-400 hover:text-slate-950 hover:shadow-lg"
                >
                  {tech}
                </span>
              )
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default ExperienceCard;