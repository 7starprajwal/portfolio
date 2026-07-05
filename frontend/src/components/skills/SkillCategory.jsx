import { motion } from "framer-motion";
import SkillCard from "./SkillCard";

function SkillCategory({
  category,
  onSelectSkill,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="mb-16"
    >
      {/* Category Heading */}
      <h3 className="mb-8 text-3xl font-bold text-cyan-400">
        {category.title}
      </h3>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {category.skills.map((skill) => (
          <SkillCard
            key={skill.id}
            skill={skill}
            onClick={onSelectSkill}
          />
        ))}
      </div>
    </motion.div>
  );
}

export default SkillCategory;