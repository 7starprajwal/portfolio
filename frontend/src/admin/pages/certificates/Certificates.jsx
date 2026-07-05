import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";

import {
  getCertificates,
  createCertificate,
  updateCertificate,
  deleteCertificate,
} from "../../services/certificateService";

import DeleteToast from "../../components/common/DeleteToast";
import CertificateModal from "./CertificateModal";

function Certificates() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCertificate, setSelectedCertificate] =
    useState(null);

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      setLoading(true);

      const response = await getCertificates();

      setCertificates(response.certificates || []);
      setError("");
    } catch (err) {
      const message =
        err.response?.data?.message ||
        "Failed to load certificates.";

      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setSelectedCertificate(null);
    setIsModalOpen(true);
  };

  const openEditModal = (certificate) => {
    setSelectedCertificate(certificate);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedCertificate(null);
    setIsModalOpen(false);
  };

  const handleSave = async (formData) => {
    try {
      setSaving(true);

      let response;

      if (selectedCertificate) {
        response = await updateCertificate(
          selectedCertificate._id,
          formData
        );
      } else {
        response = await createCertificate(
          formData
        );
      }

      toast.success(
        response.message ||
          (selectedCertificate
            ? "Certificate updated successfully."
            : "Certificate created successfully.")
      );

      closeModal();

      fetchCertificates();
    } catch (err) {
      console.error(err);

      toast.error(
        err.response?.data?.message ||
          "Failed to save certificate."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = (id) => {
    DeleteToast({
      title: "Delete Certificate",
      message:
        "Are you sure you want to delete this certificate?",

      onConfirm: async () => {
        try {
          const response =
            await deleteCertificate(id);

          toast.success(
            response.message ||
              "Certificate deleted successfully."
          );

          fetchCertificates();
        } catch (err) {
          toast.error(
            err.response?.data?.message ||
              "Failed to delete certificate."
          );
        }
      },
    });
  };

  if (loading) {
    return (
      <div className="rounded-xl bg-slate-900 p-8 text-center text-white">
        Loading certificates...
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
            Certificates
          </h1>

          <p className="mt-1 text-slate-400">
            Manage all your certificates.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center gap-2 rounded-lg bg-cyan-500 px-5 py-3 font-medium text-white transition hover:bg-cyan-600"
        >
          <FaPlus />
          Add Certificate
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl bg-slate-900 shadow-lg">
        <table className="min-w-full">
          <thead className="border-b border-slate-700">
            <tr>
              <th className="px-6 py-4 text-left text-slate-300">
                Certificate
              </th>

              <th className="px-6 py-4 text-left text-slate-300">
                Organization
              </th>

              <th className="px-6 py-4 text-left text-slate-300">
                Date
              </th>

              <th className="px-6 py-4 text-center text-slate-300">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {certificates.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="py-8 text-center text-slate-400"
                >
                  No certificates found.
                </td>
              </tr>
            ) : (
              certificates.map((certificate) => (
                <tr
                  key={certificate._id}
                  className="border-b border-slate-800 hover:bg-slate-800/40"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {certificate.image?.url && (
                        <img
                          src={certificate.image.url}
                          alt={certificate.title}
                          className="h-12 w-12 rounded-lg border border-slate-700 bg-white object-cover"
                        />
                      )}

                      <div>
                        <p className="font-medium text-white">
                          {certificate.title}
                        </p>

                        <p className="text-sm text-slate-400">
                          {certificate.featured
                            ? "Featured"
                            : "Normal"}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-slate-300">
                    {certificate.issuer}
                  </td>

                  <td className="px-6 py-4 text-slate-300">
                    {new Date(
                      certificate.issueDate
                    ).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() =>
                          openEditModal(
                            certificate
                          )
                        }
                        className="rounded bg-yellow-500 px-3 py-1 text-white transition hover:bg-yellow-600"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(
                            certificate._id
                          )
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

      <CertificateModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleSave}
        initialData={selectedCertificate}
        loading={saving}
      />
    </div>
  );
}

export default Certificates;