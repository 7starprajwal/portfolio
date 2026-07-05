import { motion } from "framer-motion";

function SkillCard({ skill, onClick }) {
  return (
    <motion.div
      whileHover={{
        scale: 1.04,
        y: -8,
      }}
      whileTap={{
        scale: 0.98,
      }}
      transition={{
        duration: 0.25,
      }}
      onClick={() => onClick(skill)}
      className="
        cursor-pointer
        rounded-3xl
        border
        border-cyan-500/20
        bg-white/5
        p-7
        backdrop-blur-xl
        transition-all
        duration-300
        hover:border-cyan-400
        hover:shadow-[0_0_35px_rgba(34,211,238,.25)]
      "
    >
      {/* Icon */}

      <div className="mb-6 flex justify-center">
        <img
          src={skill.icon}
          alt={skill.name}
          className="h-20 w-20 object-contain"
        />
      </div>

      {/* Name */}

      <h3 className="text-center text-2xl font-semibold text-white">
        {skill.name}
      </h3>

      {/* Progress */}

      <div className="mt-6">
        <div className="mb-2 flex justify-between text-sm text-slate-300">
          <span>Skill Level</span>

          <span>{skill.level}%</span>
        </div>

        <div className="h-3 overflow-hidden rounded-full bg-slate-700">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{
              width: `${skill.level}%`,
            }}
            transition={{
              duration: 1,
            }}
            className="h-full rounded-full"
            style={{
              backgroundColor:
                skill.color ||
                "#06b6d4",
            }}
          />
        </div>
      </div>

      {/* View */}

      <button
        className="
          mt-6
          w-full
          rounded-xl
          bg-cyan-500
          py-2
          font-medium
          text-white
          transition
          hover:bg-cyan-400
        "
      >
        View Details
      </button>
    </motion.div>
  );
}

export default SkillCard;