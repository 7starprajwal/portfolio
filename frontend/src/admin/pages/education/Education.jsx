import { useEffect, useState } from "react";
import {
  FaPlus,
  FaSearch,
} from "react-icons/fa";

import {
  getEducations,
  createEducation,
  updateEducation,
  deleteEducation,
} from "../../services/educationService";

import EducationModal from "./EducationModal";

function Education() {
  const [educations, setEducations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [featured, setFeatured] =
    useState("All");
  const [published, setPublished] =
    useState("All");

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [selectedEducation, setSelectedEducation] =
    useState(null);

  useEffect(() => {
    fetchEducations();
  }, [
    search,
    featured,
    published,
  ]);

  async function fetchEducations() {
    try {
      setLoading(true);

      const params = {};

      if (search.trim()) {
        params.search = search.trim();
      }

      if (featured !== "All") {
        params.featured = featured;
      }

      if (published !== "All") {
        params.published = published;
      }

      const response =
        await getEducations(params);

      setEducations(
        response.educations || []
      );

      setError("");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to load education."
      );
    } finally {
      setLoading(false);
    }
  }

  function openAddModal() {
    setSelectedEducation(null);
    setIsModalOpen(true);
  }

  function openEditModal(item) {
    setSelectedEducation(item);
    setIsModalOpen(true);
  }

  function closeModal() {
    setSelectedEducation(null);
    setIsModalOpen(false);
  }

  async function handleSave(data) {
    try {
      setSaving(true);

      const formData = new FormData();

      Object.entries(data).forEach(
        ([key, value]) => {
          if (
            value !== null &&
            value !== undefined
          ) {
            formData.append(
              key,
              value
            );
          }
        }
      );

      if (selectedEducation) {
        await updateEducation(
          selectedEducation._id,
          formData
        );
      } else {
        await createEducation(
          formData
        );
      }

      closeModal();
      fetchEducations();
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Unable to save education."
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (
      !window.confirm(
        "Delete this education?"
      )
    ) {
      return;
    }

    try {
      await deleteEducation(id);
      fetchEducations();
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Unable to delete education."
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

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Education
          </h1>

          <p className="mt-1 text-slate-400">
            Manage your education history.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-white transition hover:bg-cyan-400"
        >
          <FaPlus />
          Add Education
        </button>
      </div>

      {/* Statistics */}

      <div className="rounded-xl bg-slate-900 p-6 shadow-lg">
        <h3 className="text-slate-400">
          Total Education
        </h3>

        <p className="mt-2 text-4xl font-bold text-cyan-400">
          {educations.length}
        </p>
      </div>

      {/* Filters */}

      <div className="grid gap-4 md:grid-cols-3">
        <div className="relative">
          <FaSearch className="absolute left-3 top-4 text-slate-500" />

          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="w-full rounded-xl border border-slate-700 bg-slate-900 py-3 pl-10 pr-4 text-white outline-none"
          />
        </div>

        <select
          value={featured}
          onChange={(e) =>
            setFeatured(
              e.target.value
            )
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
            setPublished(
              e.target.value
            )
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

            {/* Education Table */}

      <div className="overflow-hidden rounded-xl bg-slate-900 shadow-lg">
        <table className="min-w-full">
          <thead className="border-b border-slate-700 bg-slate-800">
            <tr>
              <th className="px-6 py-4 text-left text-slate-300">
                Education
              </th>

              <th className="px-6 py-4 text-left text-slate-300">
                Institution
              </th>

              <th className="px-6 py-4 text-center text-slate-300">
                CGPA
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
            {educations.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="py-12 text-center text-slate-400"
                >
                  No Education Found
                </td>
              </tr>
            ) : (
              educations.map((education) => (
                <tr
                  key={education._id}
                  className="border-b border-slate-800 transition hover:bg-slate-800/50"
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <img
                        src={
                          education.logo?.url ||
                          "https://placehold.co/80x80?text=Logo"
                        }
                        alt={education.degree}
                        className="h-14 w-14 rounded-lg object-cover"
                      />

                      <div>
                        <h3 className="font-semibold text-white">
                          {education.degree}
                        </h3>

                        <p className="text-sm text-slate-400">
                          {education.specialization}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <div>
                      <p className="font-medium text-white">
                        {education.institution}
                      </p>

                      <p className="text-sm text-slate-400">
                        {education.university}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        {education.location}
                      </p>
                    </div>
                  </td>

                  <td className="px-6 py-5 text-center text-cyan-400 font-semibold">
                    {education.cgpa || "-"}
                  </td>

                  <td className="px-6 py-5 text-center">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold text-white ${
                        education.featured
                          ? "bg-green-600"
                          : "bg-slate-700"
                      }`}
                    >
                      {education.featured
                        ? "Featured"
                        : "Normal"}
                    </span>
                  </td>

                  <td className="px-6 py-5 text-center">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold text-white ${
                        education.isPublished
                          ? "bg-cyan-600"
                          : "bg-yellow-600"
                      }`}
                    >
                      {education.isPublished
                        ? "Published"
                        : "Draft"}
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() =>
                          openEditModal(
                            education
                          )
                        }
                        className="rounded-lg bg-yellow-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-yellow-600"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(
                            education._id
                          )
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

      <EducationModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleSave}
        initialData={selectedEducation}
        loading={saving}
      />
    </div>
  );
}

export default Education;