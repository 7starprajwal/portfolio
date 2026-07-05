import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";

import {
  getExperience,
  createExperience,
  updateExperience,
  deleteExperience,
} from "../../services/experienceService";


import DeleteToast from "../../components/common/DeleteToast";
import ExperienceModal from "./ExperienceModal";

function Experience() {
  const [experience, setExperience] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExperience, setSelectedExperience] =
    useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchExperience();
  }, []);

  const fetchExperience = async () => {
    try {
      setLoading(true);

      const response = await getExperience();

      setExperience(response.data || []);
    } catch (err) {
      const message =
        err.response?.data?.message ||
        "Failed to load experience.";

      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setSelectedExperience(null);
    setIsModalOpen(true);
  };

  const handleEdit = (item) => {
    setSelectedExperience(item);
    setIsModalOpen(true);
  };

const handleDelete = (id) => {
  DeleteToast({
    title: "Delete Experience",
    message:
      "Are you sure you want to delete this experience?",

    onConfirm: async () => {
      try {
        const response =
          await deleteExperience(id);

        toast.success(
          response.message ||
            "Experience deleted successfully."
        );

        fetchExperience();
      } catch (err) {
        toast.error(
          err.response?.data?.message ||
            "Failed to delete experience."
        );
      }
    },
  });
};

  const handleSubmit = async (formData) => {
    try {
      setSaving(true);

      let response;

      if (selectedExperience) {
        response = await updateExperience(
          selectedExperience._id,
          formData
        );
      } else {
        response = await createExperience(formData);
      }

      toast.success(
        response.message ||
          (selectedExperience
            ? "Experience updated successfully."
            : "Experience created successfully.")
      );

      setIsModalOpen(false);
      setSelectedExperience(null);

      fetchExperience();
    } catch (err) {
      console.error(err);

      toast.error(
        err.response?.data?.message ||
          "Failed to save experience."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="rounded-xl bg-slate-900 p-8 text-center text-white">
        Loading experience...
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Experience
          </h1>

          <p className="mt-1 text-slate-400">
            Manage your work experience.
          </p>
        </div>

        <button
          onClick={handleAdd}
          className="flex items-center gap-2 rounded-lg bg-cyan-500 px-5 py-3 font-medium text-white transition hover:bg-cyan-600"
        >
          <FaPlus />
          Add Experience
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl bg-slate-900 shadow-lg">
        <table className="min-w-full">
          <thead className="border-b border-slate-700">
            <tr>
              <th className="px-6 py-4 text-left text-slate-300">
                Company
              </th>

              <th className="px-6 py-4 text-left text-slate-300">
                Job Title
              </th>

              <th className="px-6 py-4 text-left text-slate-300">
                Employment
              </th>

              <th className="px-6 py-4 text-left text-slate-300">
                Duration
              </th>

              <th className="px-6 py-4 text-left text-slate-300">
                Featured
              </th>

              <th className="px-6 py-4 text-left text-slate-300">
                Published
              </th>

              <th className="px-6 py-4 text-center text-slate-300">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {experience.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="py-8 text-center text-slate-400"
                >
                  No experience found.
                </td>
              </tr>
            ) : (
              experience.map((item) => (
                <tr
                  key={item._id}
                  className="border-b border-slate-800 hover:bg-slate-800/40"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                     {item.companyLogo?.url && (
  <img
    src={item.companyLogo.url}
    alt={item.companyName}
    className="h-10 w-10 rounded-lg border border-slate-700 bg-white p-1 object-contain"
  />
)}

                      <div>
                        <p className="font-medium text-white">
                          {item.companyName}
                        </p>

                        <p className="text-sm text-slate-400">
                          {item.location || "-"}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-white">
                    {item.jobTitle}
                  </td>

                  <td className="px-6 py-4 text-slate-300">
                    {item.employmentType}
                  </td>

                  <td className="px-6 py-4 text-slate-300">
                    {new Date(
                      item.startDate
                    ).toLocaleDateString()}
                    {" - "}
                    {item.currentJob
                      ? "Present"
                      : item.endDate
                      ? new Date(
                          item.endDate
                        ).toLocaleDateString()
                      : "-"}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        item.featured
                          ? "bg-green-500/20 text-green-400"
                          : "bg-slate-700 text-slate-300"
                      }`}
                    >
                      {item.featured
                        ? "Yes"
                        : "No"}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        item.published
                          ? "bg-blue-500/20 text-blue-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {item.published
                        ? "Published"
                        : "Hidden"}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => handleEdit(item)}
                        className="rounded bg-yellow-500 px-3 py-1 text-white transition hover:bg-yellow-600"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(item._id)
                        }
                        className="rounded bg-red-500 px-3 py-1 text-white transition hover:bg-red-600"
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

      <ExperienceModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedExperience(null);
        }}
        onSubmit={handleSubmit}
        initialData={selectedExperience}
        loading={saving}
      />
    </div>
  );
}

export default Experience;