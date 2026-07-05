import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { getSkills } from "../../services/skillService";

import SkillCategory from "./SkillCategory";
import SkillModal from "./SkillModal";

function SkillsSection() {
  const [skillsData, setSkillsData] = useState([]);
  const [selectedSkill, setSelectedSkill] =
    useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSkills();
  }, []);

  async function fetchSkills() {
    try {
      setLoading(true);

      const response = await getSkills();

      const grouped = response.skills.reduce(
        (acc, skill) => {
          let category = acc.find(
            (item) => item.title === skill.category
          );

          if (!category) {
            category = {
              id: acc.length + 1,
              title: skill.category,
              skills: [],
            };

            acc.push(category);
          }

          category.skills.push({
            id: skill._id,
            name: skill.name,
            level: skill.level,
            color: skill.color,
            icon: skill.icon?.url,
            featured: skill.featured,
            category: skill.category,
            description: skill.description,
            experience: skill.experience,
            technologies: skill.technologies,
            projects: skill.projects,
          });

          return acc;
        },
        []
      );

      grouped.forEach((category) => {
        category.skills.sort(
          (a, b) =>
            Number(b.featured) -
            Number(a.featured)
        );
      });

      setSkillsData(grouped);
    } catch (error) {
      console.error(
        "Failed to load skills:",
        error
      );
    } finally {
      setLoading(false);
    }
  }

  const totalSkills = skillsData.reduce(
    (total, category) =>
      total + category.skills.length,
    0
  );

  if (loading) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-[#0f172a]">
        <div className="h-14 w-14 animate-spin rounded-full border-4 border-cyan-500 border-t-transparent"></div>
      </section>
    );
  }

  return (
    <section
      id="skills"
      className="min-h-screen bg-[#0f172a] px-6 py-24"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <h2 className="text-5xl font-bold text-white">
            My{" "}
            <span className="text-cyan-400">
              Skills
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400">
            Here are the technologies and tools I use
            to build modern, scalable, and
            high-performance full stack
            applications.
          </p>

          <p className="mt-5 text-cyan-400">
            {totalSkills} Skills •{" "}
            {skillsData.length} Categories
          </p>
        </motion.div>

        {skillsData.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-700 py-16 text-center">
            <h3 className="text-2xl font-semibold text-white">
              No Skills Found
            </h3>

            <p className="mt-3 text-slate-400">
              Add skills from the Admin Dashboard.
            </p>
          </div>
        ) : (
          <div className="space-y-16">
            {skillsData.map((category) => (
              <SkillCategory
                key={category.id}
                category={category}
                onSelectSkill={
                  setSelectedSkill
                }
              />
            ))}
          </div>
        )}

        {selectedSkill && (
          <SkillModal
            skill={selectedSkill}
            onClose={() =>
              setSelectedSkill(null)
            }
          />
        )}
      </div>
    </section>
  );
}

export default SkillsSection;