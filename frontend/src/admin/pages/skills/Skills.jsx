import { useEffect, useState } from "react";
import {
  FaPlus,
  FaSearch,
} from "react-icons/fa";

import {
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill,
} from "../../services/skillService";

import SkillModal from "./SkillModal";

function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [featured, setFeatured] = useState("All");
  const [published, setPublished] = useState("All");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);

  useEffect(() => {
    fetchSkills();
  }, [
    search,
    category,
    featured,
    published,
  ]);

 async function fetchSkills() {
  try {
    setLoading(true);

    const response = await getSkills({
      search,
      category: category === "All" ? "" : category,
      featured: featured === "All" ? "" : featured,
      published: published === "All" ? "" : published,
    });

    console.log("Response:", response);
    console.log("Skills:", response.skills);

    setSkills(response.skills || []);
    setError("");
  } catch (err) {
    console.error("API Error:", err);
    setError(
      err.response?.data?.message ||
      "Failed to load skills."
    );
  } finally {
    setLoading(false);
  }
}

  function openAddModal() {
    setSelectedSkill(null);
    setIsModalOpen(true);
  }

  function openEditModal(skill) {
    setSelectedSkill(skill);
    setIsModalOpen(true);
  }

  function closeModal() {
    setSelectedSkill(null);
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
      } else if (key === "projects") {
        formData.append(
          key,
          JSON.stringify(value)
        );
      } else if (value !== null) {
        formData.append(key, value);
      }
    });

    if (selectedSkill) {
      await updateSkill(
        selectedSkill._id,
        formData
      );
    } else {
      await createSkill(formData);
    }

    closeModal();
    fetchSkills();
  } catch (err) {
    alert(
      err.response?.data?.message ||
        "Unable to save skill."
    );
  } finally {
    setSaving(false);
  }
}

  async function handleDelete(id) {
    if (
      !window.confirm(
        "Delete this skill?"
      )
    ) {
      return;
    }

    try {
      await deleteSkill(id);
      fetchSkills();
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Unable to delete skill."
      );
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
            {/* Header */}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Skills
          </h1>

          <p className="mt-1 text-slate-400">
            Manage your portfolio skills.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-white transition hover:bg-cyan-400"
        >
          <FaPlus />

          Add Skill
        </button>
      </div>

      {/* Statistics */}

      <div className="rounded-xl bg-slate-900 p-6 shadow-lg">
        <h3 className="text-slate-400">
          Total Skills
        </h3>

        <p className="mt-2 text-4xl font-bold text-cyan-400">
          {skills.length}
        </p>
      </div>

      {/* Filters */}

      <div className="grid gap-4 md:grid-cols-4">
        <div className="relative">
          <FaSearch className="absolute left-3 top-4 text-slate-500" />

          <input
            type="text"
            placeholder="Search skill..."
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
          <option>Frontend</option>
          <option>Backend</option>
          <option>Database</option>
          <option>Programming</option>
          <option>Tools</option>
          <option>Cloud</option>
          <option>Machine Learning</option>
          <option>Other</option>
        </select>

        <select
          value={featured}
          onChange={(e) =>
            setFeatured(e.target.value)
          }
          className="rounded-xl border border-slate-700 bg-slate-900 p-3 text-white"
        >
          <option value="All">
            All
          </option>

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
          <option value="All">
            All
          </option>

          <option value="true">
            Published
          </option>

          <option value="false">
            Draft
          </option>
        </select>
      </div>

            {/* Skills Table */}

      <div className="overflow-hidden rounded-xl bg-slate-900 shadow-lg">
        <table className="min-w-full">
          <thead className="border-b border-slate-700 bg-slate-800">
            <tr>
              <th className="px-6 py-4 text-left text-slate-300">
                Skill
              </th>

              <th className="px-6 py-4 text-left text-slate-300">
                Category
              </th>

              <th className="px-6 py-4 text-center text-slate-300">
                Level
              </th>

              <th className="px-6 py-4 text-center text-slate-300">
                Featured
              </th>

              <th className="px-6 py-4 text-center text-slate-300">
                Status
              </th>

              <th className="px-6 py-4 text-center text-slate-300">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {skills.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="py-12 text-center text-slate-400"
                >
                  No Skills Found
                </td>
              </tr>
            ) : (
              skills.map((skill) => (
                <tr
                  key={skill._id}
                  className="border-b border-slate-800 transition hover:bg-slate-800/50"
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <img
                        src={
                          skill.icon?.url ||
                          "https://placehold.co/80x80?text=Skill"
                        }
                        alt={skill.name}
                        className="h-14 w-14 rounded-lg object-cover"
                      />

                      <div>
                        <h3 className="font-semibold text-white">
                          {skill.name}
                        </h3>

                        <p className="text-sm text-slate-400">
                          {skill.color}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-5 text-slate-300">
                    {skill.category}
                  </td>

                  <td className="px-6 py-5">
                    <div className="mx-auto w-32">
                      <div className="h-3 overflow-hidden rounded-full bg-slate-700">
                        <div
                          className="h-full rounded-full bg-cyan-500"
                          style={{
                            width: `${skill.level}%`,
                          }}
                        />
                      </div>

                      <p className="mt-2 text-center text-sm text-white">
                        {skill.level}%
                      </p>
                    </div>
                  </td>

                  <td className="px-6 py-5 text-center">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold text-white ${
                        skill.featured
                          ? "bg-green-600"
                          : "bg-slate-700"
                      }`}
                    >
                      {skill.featured
                        ? "Featured"
                        : "Normal"}
                    </span>
                  </td>

                  <td className="px-6 py-5 text-center">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold text-white ${
                        skill.isPublished
                          ? "bg-cyan-600"
                          : "bg-yellow-600"
                      }`}
                    >
                      {skill.isPublished
                        ? "Published"
                        : "Draft"}
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() =>
                          openEditModal(skill)
                        }
                        className="rounded-lg bg-yellow-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-yellow-600"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(skill._id)
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

      <SkillModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleSave}
        initialData={selectedSkill}
        loading={saving}
      />
    </div>
  );
}

export default Skills;