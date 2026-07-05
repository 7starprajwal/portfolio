import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { getFeaturedProjects } from "../../services/projectService";

import ProjectCard from "./ProjectCard";
import ProjectSearch from "./ProjectSearch";
import ProjectFilter from "./ProjectFilter";

function ProjectsSection() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] =
    useState("All");

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    try {
      setLoading(true);

      const response =
        await getFeaturedProjects();

      setProjects(response.projects || []);
      setError("");
    } catch (err) {
      console.error(err);

      setError(
        "Unable to load featured projects."
      );
    } finally {
      setLoading(false);
    }
  }

  const filters = useMemo(() => {
    return [
      "All",
      ...new Set(
        projects.map(
          (project) => project.category
        )
      ),
    ];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    const search =
      searchTerm.toLowerCase().trim();

    return projects
      .filter((project) => {
        const matchesSearch =
          project.title
            ?.toLowerCase()
            .includes(search) ||
          project.shortDescription
            ?.toLowerCase()
            .includes(search) ||
          project.description
            ?.toLowerCase()
            .includes(search) ||
          project.category
            ?.toLowerCase()
            .includes(search) ||
          project.technologies?.some((tech) =>
            tech
              .toLowerCase()
              .includes(search)
          );

        const matchesFilter =
          selectedFilter === "All" ||
          project.category ===
            selectedFilter;

        return (
          matchesSearch &&
          matchesFilter
        );
      })
      .sort(
        (a, b) =>
          (a.order || 0) -
          (b.order || 0)
      );
  }, [
    projects,
    searchTerm,
    selectedFilter,
  ]);

  if (loading) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-slate-950">
        <div className="h-14 w-14 animate-spin rounded-full border-4 border-cyan-500 border-t-transparent"></div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-slate-950">
        <div className="rounded-xl bg-red-500/10 px-8 py-6 text-red-400">
          {error}
        </div>
      </section>
    );
  }

  return (
    <section
      id="projects"
      className="bg-slate-950 py-24"
    >
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-5xl font-bold text-white">
            Featured Projects
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg text-slate-400">
            Explore some of my best
            Full Stack, Frontend,
            Backend and Machine
            Learning projects.
          </p>

          <p className="mt-5 text-cyan-400">
            Showing{" "}
            <span className="font-semibold">
              {filteredProjects.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold">
              {projects.length}
            </span>{" "}
            Featured Projects
          </p>
        </motion.div>

        <ProjectSearch
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <ProjectFilter
          filters={filters}
          selected={selectedFilter}
          setSelected={
            setSelectedFilter
          }
        />

        {filteredProjects.length ===
        0 ? (
          <div className="rounded-2xl border border-dashed border-slate-700 py-16 text-center">
            <h3 className="text-2xl font-semibold text-white">
              No Projects Found
            </h3>

            <p className="mt-3 text-slate-400">
              Try another search or
              choose a different
              category.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {filteredProjects.map(
              (project) => (
                <ProjectCard
                  key={project._id}
                  project={project}
                />
              )
            )}
          </div>
        )}

        <div className="mt-16 text-center">
          <Link
            to="/projects"
            className="inline-flex rounded-xl bg-cyan-500 px-8 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400"
          >
            View All Projects →
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ProjectsSection;