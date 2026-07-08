import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

import { getProjects } from "../../services/projectService";

import ProjectSearch from "../../components/projects/ProjectSearch";
import ProjectFilter from "../../components/projects/ProjectFilter";
import ProjectSort from "../../components/projects/ProjectSort";
import ProjectCard from "../../components/projects/ProjectCard";
import Pagination from "../../components/projects/Pagination";

import {
  containerVariants,
  cardVariants,
} from "../../components/animations/projectVariants";

function AllProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [selectedFilter, setSelectedFilter] =
    useState("All");
  const [sort, setSort] = useState("newest");

  const [currentPage, setCurrentPage] =
    useState(1);

  const projectsPerPage = 6;

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    try {
      setLoading(true);

      const response = await getProjects({
  published: true,
  limit: 1000,
});

      setProjects(response.projects || []);
      setError("");
    } catch (err) {
      console.error(err);
      setError(
        "Unable to load projects."
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
    const keyword =
      search.toLowerCase().trim();

    let list = projects.filter((project) => {
      const matchesCategory =
        selectedFilter === "All" ||
        project.category ===
          selectedFilter;

      const matchesSearch =
        project.title
          ?.toLowerCase()
          .includes(keyword) ||
        project.shortDescription
          ?.toLowerCase()
          .includes(keyword) ||
        project.description
          ?.toLowerCase()
          .includes(keyword) ||
        project.technologies?.some((tech) =>
          tech
            .toLowerCase()
            .includes(keyword)
        );

      return (
        matchesCategory &&
        matchesSearch
      );
    });

    switch (sort) {
      case "az":
        list.sort((a, b) =>
          a.title.localeCompare(b.title)
        );
        break;

      case "za":
        list.sort((a, b) =>
          b.title.localeCompare(a.title)
        );
        break;

      case "oldest":
        list.sort(
          (a, b) =>
            new Date(a.createdAt) -
            new Date(b.createdAt)
        );
        break;

      case "newest":
      default:
        list.sort(
          (a, b) =>
            new Date(b.createdAt) -
            new Date(a.createdAt)
        );
    }

    return list;
  }, [
    projects,
    search,
    selectedFilter,
    sort,
  ]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedFilter, sort]);

  const totalPages = Math.ceil(
    filteredProjects.length /
      projectsPerPage
  );

  const startIndex =
    (currentPage - 1) *
    projectsPerPage;

  const currentProjects =
    filteredProjects.slice(
      startIndex,
      startIndex +
        projectsPerPage
    );

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
    <section className="container mx-auto px-4 py-20">

      <motion.h1
        initial={{
          opacity: 0,
          y: -30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
        }}
        className="mb-10 text-center text-5xl font-bold text-white"
      >
        All Projects
      </motion.h1>

      <ProjectSearch
        search={search}
        setSearch={setSearch}
      />

     <ProjectFilter
  filters={filters}
  selected={selectedFilter}
  setSelected={setSelectedFilter}
  projectData={projects}
/>
      <ProjectSort
        sort={sort}
        setSort={setSort}
      />

      <p className="mb-6 mt-8 text-center text-gray-400">
        Showing{" "}
        {currentProjects.length} of{" "}
        {filteredProjects.length} Projects
      </p>

      {currentProjects.length >
      0 ? (
        <>
          <motion.div
            variants={
              containerVariants
            }
            initial="hidden"
            animate="visible"
            className="grid auto-rows-fr grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {currentProjects.map(
              (project) => (
                <motion.div
                  key={
                    project._id
                  }
                  variants={
                    cardVariants
                  }
                >
                  <ProjectCard
                    project={
                      project
                    }
                  />
                </motion.div>
              )
            )}
          </motion.div>

          <Pagination
            currentPage={
              currentPage
            }
            totalPages={
              totalPages
            }
            setCurrentPage={
              setCurrentPage
            }
          />
        </>
      ) : (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          className="mt-16 text-center"
        >
          <h2 className="text-2xl font-semibold text-white">
            No Projects Found
          </h2>

          <p className="mt-2 text-gray-400">
            Try another search
            or category.
          </p>
        </motion.div>
      )}
    </section>
  );
}

export default AllProjectsPage;