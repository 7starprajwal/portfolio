import { motion } from "framer-motion";
import {
  FaGithub,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";

function ProjectCard({ project }) {
  const image =
    project.image?.url ||
    "https://placehold.co/600x400?text=No+Image";

  return (
    <motion.div
      whileHover={{
        y: -10,
      }}
      transition={{
        duration: 0.3,
      }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-xl transition-all hover:border-cyan-500 hover:shadow-cyan-500/20"
    >
      {/* Image */}

      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={project.title}
          className="h-60 w-full object-cover transition duration-500 group-hover:scale-110"
        />

        {project.featured && (
          <span className="absolute left-4 top-4 rounded-full bg-cyan-500 px-3 py-1 text-xs font-semibold text-slate-950">
            Featured
          </span>
        )}

        <span className="absolute bottom-4 right-4 rounded-full bg-slate-950/80 px-3 py-1 text-xs font-medium text-cyan-400 backdrop-blur">
          {project.category}
        </span>
      </div>

      {/* Content */}

      <div className="flex flex-1 flex-col p-6">
        <Link to={`/projects/${project.slug}`}>
          <h3 className="text-2xl font-bold text-white transition hover:text-cyan-400">
            {project.title}
          </h3>
        </Link>

        <p className="mt-4 line-clamp-3 text-slate-400">
          {project.shortDescription}
        </p>

        {/* Technologies */}

        <div className="mt-6 flex flex-wrap gap-2">
          {project.technologies?.map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-cyan-500/10 px-3 py-1 text-sm font-medium text-cyan-300"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Buttons */}

        <div className="mt-auto flex gap-3 pt-8">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-cyan-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400"
            >
              <FaGithub />
              GitHub
            </a>
          )}

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-cyan-500 px-4 py-3 font-semibold text-cyan-400 transition hover:bg-cyan-500 hover:text-slate-950"
            >
              <FaExternalLinkAlt />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default ProjectCard;