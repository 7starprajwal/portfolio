import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

import { getSkills } from "../../services/skillService";

import SkillCategory from "./SkillCategory";
import SkillModal from "./SkillModal";

function SkillsSection() {
  const [skillsData, setSkillsData] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [loading, setLoading] = useState(true);

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] =
    useState("All");
  const [sortBy, setSortBy] =
    useState("default");
  const [featuredOnly, setFeaturedOnly] =
    useState(false);

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
            (item) =>
              item.title === skill.category
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
            description:
              skill.description,
            experience:
              skill.experience,
            technologies:
              skill.technologies,
            projects: skill.projects,
          });

          return acc;
        },
        []
      );

      setSkillsData(grouped);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const totalSkills = skillsData.reduce(
    (total, category) =>
      total + category.skills.length,
    0
  );

  const categories = [
    "All",
    ...new Set(
      skillsData.map(
        (category) => category.title
      )
    ),
  ];

  const filteredSkillsData = useMemo(() => {
    return skillsData
      .map((category) => {
        let skills = [...category.skills];

        // Search
        skills = skills.filter((skill) =>
          skill.name
            .toLowerCase()
            .includes(
              searchTerm.toLowerCase()
            )
        );

        // Featured
        if (featuredOnly) {
          skills = skills.filter(
            (skill) => skill.featured
          );
        }

        // Sorting
        switch (sortBy) {
          case "az":
            skills.sort((a, b) =>
              a.name.localeCompare(
                b.name
              )
            );
            break;

          case "za":
            skills.sort((a, b) =>
              b.name.localeCompare(
                a.name
              )
            );
            break;

          case "high":
            skills.sort(
              (a, b) =>
                b.level - a.level
            );
            break;

          case "low":
            skills.sort(
              (a, b) =>
                a.level - b.level
            );
            break;

          default:
            break;
        }

        return {
          ...category,
          skills,
        };
      })
      .filter((category) => {
        if (
          categoryFilter !== "All"
        ) {
          return (
            category.title ===
              categoryFilter &&
            category.skills.length > 0
          );
        }

        return (
          category.skills.length > 0
        );
      });
  }, [
    skillsData,
    searchTerm,
    categoryFilter,
    sortBy,
    featuredOnly,
  ]);

  const filteredCount =
    filteredSkillsData.reduce(
      (total, category) =>
        total +
        category.skills.length,
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

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-5xl font-bold text-white">
            My{" "}
            <span className="text-cyan-400">
              Skills
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
            Here are the technologies and tools I use to
            build modern, scalable and high performance
            full stack applications.
          </p>

          <p className="mt-5 text-cyan-400">
            Showing {filteredCount} of {totalSkills} Skills •{" "}
            {skillsData.length} Categories
          </p>
        </motion.div>

        {/* Filters */}

        <div className="mb-16 rounded-2xl border border-slate-800 bg-slate-900/70 p-6">

          <div className="grid gap-4 md:grid-cols-4">

            {/* Search */}

            <input
              type="text"
              placeholder="🔍 Search skills..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
              className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
            />

            {/* Category */}

            <select
              value={categoryFilter}
              onChange={(e) =>
                setCategoryFilter(e.target.value)
              }
              className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white"
            >
              {categories.map((category) => (
                <option
                  key={category}
                  value={category}
                >
                  {category}
                </option>
              ))}
            </select>

            {/* Sort */}

            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value)
              }
              className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white"
            >
              <option value="default">
                Default
              </option>

              <option value="az">
                A-Z
              </option>

              <option value="za">
                Z-A
              </option>

              <option value="high">
                Highest Skill Level
              </option>

              <option value="low">
                Lowest Skill Level
              </option>
            </select>

            {/* Featured */}

            <div className="flex items-center justify-between rounded-xl border border-slate-700 bg-slate-800 px-4 py-3">

              <label className="text-white">
                Featured
              </label>

              <input
                type="checkbox"
                checked={featuredOnly}
                onChange={() =>
                  setFeaturedOnly(
                    !featuredOnly
                  )
                }
                className="h-5 w-5 accent-cyan-500"
              />
            </div>

          </div>

          {/* Reset */}

          <div className="mt-5 flex justify-end">

            <button
              onClick={() => {
                setSearchTerm("");
                setCategoryFilter("All");
                setSortBy("default");
                setFeaturedOnly(false);
              }}
              className="rounded-xl bg-cyan-500 px-6 py-3 font-medium text-white transition hover:bg-cyan-600"
            >
              Reset Filters
            </button>

          </div>

        </div>

        {/* Skills */}

        {filteredSkillsData.length === 0 ? (

          <div className="rounded-2xl border border-dashed border-slate-700 py-20 text-center">

            <h3 className="text-2xl font-semibold text-white">
              No Skills Found
            </h3>

            <p className="mt-3 text-slate-400">
              Try another search or filter.
            </p>

          </div>

        ) : (

          <div className="space-y-16">

            {filteredSkillsData.map((category) => (

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

        {/* Modal */}

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