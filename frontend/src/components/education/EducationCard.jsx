import { motion } from "framer-motion";

function EducationCard({ education }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="rounded-3xl border border-cyan-500/20 bg-slate-900/60 p-8 shadow-xl backdrop-blur-md"
    >
      <div className="flex flex-col gap-8 md:flex-row md:justify-between">
        <div className="flex gap-6">
          {education.logo && (
            <img
              src={education.logo}
              alt={education.institution}
              className="h-24 w-24 rounded-2xl border border-cyan-500/20 bg-white object-contain p-2"
            />
          )}

          <div>
            <h3 className="text-3xl font-bold text-white">
              {education.degree}
            </h3>

            <p className="mt-2 text-xl font-semibold text-cyan-400">
              {education.specialization}
            </p>

            <p className="mt-4 text-slate-300">
              {education.institution}
            </p>

            <p className="text-slate-400">
              {education.location}
            </p>
          </div>
        </div>

        <div className="text-left md:text-right">
          <p className="text-lg font-semibold text-white">
            {new Date(education.startDate).getFullYear()} -{" "}
            {education.endDate
              ? new Date(education.endDate).getFullYear()
              : "Present"}
          </p>

          <p className="mt-3 text-cyan-300">
            CGPA: {education.cgpa}
          </p>
        </div>
      </div>

      {education.description && (
        <div className="mt-8">
          <h4 className="mb-3 text-lg font-semibold text-white">
            Description
          </h4>

          <p className="leading-8 text-slate-300">
            {education.description}
          </p>
        </div>
      )}

      {education.achievements?.length > 0 && (
        <div className="mt-8">
          <h4 className="mb-4 text-lg font-semibold text-white">
            Achievements
          </h4>

          <div className="flex flex-wrap gap-3">
            {education.achievements.map((item, index) => (
              <span
                key={index}
                className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-300 transition hover:bg-cyan-400 hover:text-slate-950"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default EducationCard;