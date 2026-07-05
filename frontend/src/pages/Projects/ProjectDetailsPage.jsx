import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ExternalLink,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";

import { getProjectBySlug } from "../../services/projectService";
import ImageLightbox from "../../components/projects/ImageLightbox";
import RelatedProjects from "../../components/projects/RelatedProjects";

function ProjectDetailsPage() {
  const { slug } = useParams();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    fetchProject();
  }, [slug]);

  async function fetchProject() {
    try {
      setLoading(true);

      const response = await getProjectBySlug(slug);

      setProject(response.project);
    } catch (error) {
      console.error("Failed to load project:", error);
      setProject(null);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#050816]">
        <div className="h-14 w-14 animate-spin rounded-full border-4 border-cyan-500 border-t-transparent"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#050816] text-white">
        <h1 className="text-4xl font-bold">
          Project Not Found
        </h1>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#050816] py-28 text-white">
      <div className="mx-auto max-w-7xl px-6">

        <Link
          to="/projects"
          className="mb-10 inline-flex items-center gap-2 text-cyan-400 transition hover:text-cyan-300"
        >
          <ArrowLeft size={18} />
          Back to Projects
        </Link>

        <img
          src={
            project.image?.url ||
            "https://placehold.co/1200x600?text=No+Image"
          }
          alt={project.title}
          onClick={() => setShowImage(true)}
          className="h-[450px] w-full cursor-pointer rounded-2xl object-cover shadow-lg transition hover:scale-[1.01]"
        />

        <div className="mt-10">
          <div className="flex flex-wrap items-center gap-3">

            <span className="rounded-full bg-cyan-500/20 px-4 py-2 text-sm font-medium text-cyan-400">
              {project.category}
            </span>

            {project.featured && (
              <span className="rounded-full bg-yellow-500/20 px-4 py-2 text-sm font-medium text-yellow-400">
                Featured
              </span>
            )}

          </div>

          <h1 className="mt-6 text-5xl font-bold">
            {project.title}
          </h1>

          <p className="mt-8 text-lg leading-8 text-gray-300">
            {project.description}
          </p>
        </div>

        <div className="mt-16">
          <h2 className="mb-6 text-3xl font-bold">
            Technology Stack
          </h2>

          <div className="flex flex-wrap gap-4">
            {project.technologies?.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-cyan-500 px-5 py-2 text-cyan-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-wrap gap-5">

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl bg-cyan-500 px-8 py-4 font-semibold text-black transition hover:bg-cyan-400"
            >
              <FaGithub size={20} />
              GitHub
            </a>
          )}

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl border border-cyan-500 px-8 py-4 text-cyan-400 transition hover:bg-cyan-500 hover:text-black"
            >
              <ExternalLink size={20} />
              Live Demo
            </a>
          )}

        </div>

        <RelatedProjects
          currentSlug={project.slug}
          currentCategory={project.category}
        />

      </div>

      <ImageLightbox
        image={
          showImage
            ? project.image?.url
            : null
        }
        title={project.title}
        onClose={() => setShowImage(false)}
      />
    </section>
  );
}

export default ProjectDetailsPage;