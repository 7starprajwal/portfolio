import { useEffect, useState } from "react";
import { FaPlus, FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";

import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../../services/projectService";

import ProjectModal from "./ProjectModal";
import ConfirmModal from "../../components/common/ConfirmModal";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [deleteId, setDeleteId] =
  useState(null);

const [deleteLoading, setDeleteLoading] =
  useState(false);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [featured, setFeatured] = useState("All");
  const [published, setPublished] = useState("All");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] =
    useState(null);

  useEffect(() => {
    fetchProjects();
  }, [
    search,
    category,
    featured,
    published,
  ]);

 async function fetchProjects() {
  try {
    setLoading(true);

    const params = {};

    if (search.trim()) {
      params.search = search.trim();
    }

    if (category !== "All") {
      params.category = category;
    }

    if (featured !== "All") {
      params.featured = featured;
    }

    if (published !== "All") {
      params.published = published;
    }

const response = await getProjects({
  ...params,
  limit: 100,
});

   

    setProjects(response.projects ?? []);

    setError("");
  } catch (err) {
    console.error(err);

    setProjects([]);

    setError(
      err.response?.data?.message ||
      "Failed to load projects."
    );
  } finally {
    setLoading(false);
  }
}

  function openAddModal() {
    setSelectedProject(null);
    setIsModalOpen(true);
  }

  function openEditModal(project) {
    setSelectedProject({
      ...project,
      technologies: Array.isArray(
        project.technologies
      )
        ? project.technologies.join(", ")
        : "",
    });

    setIsModalOpen(true);
  }

  function closeModal() {
    setSelectedProject(null);
    setIsModalOpen(false);
  }

async function handleSave(data) {
  try {
    setSaving(true);

    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (key === "technologies") {
        formData.append(
          key,
          JSON.stringify(value)
        );
      } else if (value !== null) {
        formData.append(key, value);
      }
    });

    if (selectedProject) {
      await updateProject(
        selectedProject._id,
        formData
      );

      toast.success(
        "Project updated successfully!"
      );
    } else {
      await createProject(formData);

      toast.success(
        "Project created successfully!"
      );
    }

    closeModal();
    fetchProjects();
  } catch (err) {
    toast.error(
      err.response?.data?.message ||
        "Unable to save project."
    );
  } finally {
    setSaving(false);
  }
}

async function handleDelete() {
  if (!deleteId) return;

  try {
    setDeleteLoading(true);

    await deleteProject(deleteId);

    toast.success("Project deleted successfully!");

    setDeleteId(null);

    await fetchProjects();
  } catch (err) {
    toast.error(
      err.response?.data?.message ||
      "Unable to delete project."
    );
  } finally {
    setDeleteLoading(false);
  }
}

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <div className="h-14 w-14 animate-spin rounded-full border-4 border-cyan-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl bg-red-500/10 p-8 text-center text-red-400">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Projects
          </h1>

          <p className="mt-1 text-slate-400">
            Manage your portfolio projects.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-white transition hover:bg-cyan-400"
        >
          <FaPlus />

          Add Project
        </button>
      </div>

      {/* Statistics */}

      <div className="rounded-xl bg-slate-900 p-6 shadow-lg">
        <h3 className="text-slate-400">
          Total Projects
        </h3>

        <p className="mt-2 text-4xl font-bold text-cyan-400">
          {projects.length}
        </p>
      </div>

      {/* Filters */}

      <div className="grid gap-4 md:grid-cols-4">
        <div className="relative">
          <FaSearch className="absolute left-3 top-4 text-slate-500" />

          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full rounded-xl border border-slate-700 bg-slate-900 py-3 pl-10 pr-4 text-white outline-none"
          />
        </div>

        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
          className="rounded-xl border border-slate-700 bg-slate-900 p-3 text-white"
        >
          <option>All</option>
          <option>Full Stack</option>
          <option>Frontend</option>
          <option>Backend</option>
          <option>Machine Learning</option>
          <option>Python</option>
          <option>Java</option>
          <option>C++</option>
          <option>Other</option>
        </select>

        <select
          value={featured}
          onChange={(e) =>
            setFeatured(e.target.value)
          }
          className="rounded-xl border border-slate-700 bg-slate-900 p-3 text-white"
        >
          <option value="All">All</option>
          <option value="true">
            Featured
          </option>
          <option value="false">
            Normal
          </option>
        </select>

        <select
          value={published}
          onChange={(e) =>
            setPublished(e.target.value)
          }
          className="rounded-xl border border-slate-700 bg-slate-900 p-3 text-white"
        >
          <option value="All">All</option>
          <option value="true">
            Published
          </option>
          <option value="false">
            Draft
          </option>
        </select>
      </div>
            {/* Projects Table */}

     <div className="overflow-x-auto rounded-xl bg-slate-900 shadow-lg">
       <table className="min-w-[900px] w-full">
          <thead className="border-b border-slate-700 bg-slate-800">
            <tr>
              <th className="px-6 py-4 text-left text-slate-300">
                Project
              </th>

              <th className="px-6 py-4 text-left text-slate-300">
                Category
              </th>

              <th className="px-6 py-4 text-center text-slate-300">
                Featured
              </th>

              <th className="px-6 py-4 text-center text-slate-300">
                Status
              </th>
<th className="sticky right-0 bg-slate-800 px-6 py-4 text-center text-slate-300">
  Actions
</th>
            </tr>
          </thead>

          <tbody>
            {projects.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="py-12 text-center text-slate-400"
                >
                  No Projects Found
                </td>
              </tr>
            ) : (
              projects.map((project) => (
                <tr
                  key={project._id}
                  className="border-b border-slate-800 transition hover:bg-slate-800/50"
                >
                 <td className="sticky right-0 bg-slate-900 px-6 py-5">
                    <div className="flex items-center gap-4">
                      <img
                        src={
                          project.image?.url ||
                          "https://placehold.co/80x80?text=No+Image"
                        }
                        alt={project.title}
                        className="h-16 w-16 rounded-lg object-cover"
                      />

                      <div>
                        <h3 className="font-semibold text-white">
                          {project.title}
                        </h3>

                        <p className="mt-1 text-sm text-slate-400">
                          {project.slug}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-5 text-slate-300">
                    {project.category}
                  </td>

                  <td className="px-6 py-5 text-center">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold text-white ${
                        project.featured
                          ? "bg-green-600"
                          : "bg-slate-700"
                      }`}
                    >
                      {project.featured
                        ? "Featured"
                        : "Normal"}
                    </span>
                  </td>

                  <td className="px-6 py-5 text-center">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold text-white ${
                        project.isPublished
                          ? "bg-cyan-600"
                          : "bg-yellow-600"
                      }`}
                    >
                      {project.isPublished
                        ? "Published"
                        : "Draft"}
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() =>
                          openEditModal(project)
                        }
                        className="rounded-lg bg-yellow-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-yellow-600"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                        setDeleteId(project._id)
                        }
                        className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <ProjectModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleSave}
        initialData={selectedProject}
        loading={saving}
      />
      <ConfirmModal
  isOpen={!!deleteId}
  title="Delete Project"
  message="Are you sure you want to delete this project? This action cannot be undone."
  loading={deleteLoading}
  onCancel={() => setDeleteId(null)}
  onConfirm={handleDelete}
/>
    </div>
  );
}

export default Projects;