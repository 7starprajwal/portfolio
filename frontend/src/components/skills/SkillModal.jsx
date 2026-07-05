import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";

function SkillModal({ skill, onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [onClose]);

  if (!skill) return null;

return (
  <AnimatePresence>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md"
    >
      <div className="flex min-h-screen items-center justify-center overflow-y-auto p-6">
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.9,
            y: 40,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            scale: 0.9,
            y: 40,
          }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-3xl rounded-3xl border border-cyan-500/20 bg-[#111827] shadow-[0_0_60px_rgba(34,211,238,.18)]"
        >
          <button
            onClick={onClose}
            className="absolute right-6 top-6 z-10 rounded-full p-2 text-gray-400 transition hover:bg-slate-800 hover:text-white"
          >
            <FaTimes size={20} />
          </button>

          <div className="max-h-[85vh] overflow-y-auto p-10">
            <div className="flex flex-col items-center text-center">
              <img
                src={skill.icon}
                alt={skill.name}
                className="mb-6 h-28 w-28 object-contain"
              />

              <h2 className="text-4xl font-bold text-white">
                {skill.name}
              </h2>

              <span className="mt-4 rounded-full bg-cyan-500/10 px-5 py-2 text-cyan-300">
                {skill.level}% Proficiency
              </span>
            </div>

            <div className="mt-10">
              <div className="mb-2 flex justify-between text-slate-300">
                <span>Skill Level</span>
                <span>{skill.level}%</span>
              </div>

              <div className="h-4 overflow-hidden rounded-full bg-slate-700">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: `${skill.level}%`,
                  }}
                  transition={{ duration: 1 }}
                  className="h-full rounded-full"
                  style={{
                    backgroundColor:
                      skill.color || "#06b6d4",
                  }}
                />
              </div>
            </div>

            {/* Category */}
            <div className="mt-10 rounded-2xl bg-slate-800/50 p-6">
              <h3 className="mb-4 text-xl font-semibold text-white">
                Category
              </h3>

              <p className="text-gray-300">
                {skill.category}
              </p>
            </div>

            {/* Description */}
            <div className="mt-8 rounded-2xl bg-slate-800/50 p-6">
              <h3 className="mb-4 text-xl font-semibold text-white">
                Description
              </h3>

              <p className="leading-8 text-gray-300">
                {skill.description ||
                  "No description available."}
              </p>
            </div>

            {/* Experience */}
            <div className="mt-8 rounded-2xl bg-slate-800/50 p-6">
              <h3 className="mb-4 text-xl font-semibold text-white">
                Experience
              </h3>

              <p className="text-gray-300">
                {skill.experience ||
                  "Not specified"}
              </p>
            </div>

            {/* Technologies */}
            <div className="mt-8 rounded-2xl bg-slate-800/50 p-6">
              <h3 className="mb-4 text-xl font-semibold text-white">
                Technologies
              </h3>

              <div className="flex flex-wrap gap-3">
                {skill.technologies?.length ? (
                  skill.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-cyan-500/10 px-4 py-2 text-cyan-300"
                    >
                      {tech}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-300">
                    No technologies added.
                  </p>
                )}
              </div>
            </div>

            {/* Projects */}
            <div className="mt-8 rounded-2xl bg-slate-800/50 p-6">
              <h3 className="mb-4 text-xl font-semibold text-white">
                Related Projects
              </h3>

              <div className="space-y-3">
                {skill.projects?.length ? (
                  skill.projects.map((project) => (
                    <div
                      key={project}
                      className="rounded-xl bg-slate-700 p-3 text-gray-200"
                    >
                      {project}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-300">
                    No projects added.
                  </p>
                )}
              </div>
            </div>

            <div className="mt-10 flex justify-end">
              <button
                onClick={onClose}
                className="rounded-xl bg-cyan-500 px-8 py-3 font-semibold text-slate-900 transition hover:bg-cyan-400"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  </AnimatePresence>
);
}

export default SkillModal;