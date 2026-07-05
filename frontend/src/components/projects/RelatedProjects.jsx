import { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import { getProjects } from "../../services/projectService";

function RelatedProjects({
  currentSlug,
  currentCategory,
}) {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, [currentCategory]);

  async function fetchProjects() {
    try {
      const response = await getProjects({
        category: currentCategory,
        published: true,
        limit: 100,
      });

      const related =
        (response.projects || [])
          .filter(
            (project) =>
              project.slug !== currentSlug
          )
          .slice(0, 3);

      setProjects(related);
    } catch (error) {
      console.error(
        "Failed to load related projects",
        error
      );
    }
  }

  if (projects.length === 0) {
    return null;
  }

  return (
    <section className="mt-24">
      <h2 className="mb-8 text-4xl font-bold text-white">
        Related Projects
      </h2>

      <div className="grid auto-rows-fr gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard
            key={project._id}
            project={project}
          />
        ))}
      </div>
    </section>
  );
}

export default RelatedProjects;