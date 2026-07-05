import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
  getResume,
  uploadResume,
  deleteResume,
} from "../../services/resumeService";

function Resume() {
  const [resume, setResume] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] =
    useState(false);

  useEffect(() => {
    fetchResume();
  }, []);

  const fetchResume = async () => {
    try {
      const response = await getResume();
      setResume(response.resume);
    } catch {
      setResume(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a PDF.");
      return;
    }

    try {
      setLoading(true);

      await uploadResume(file);

      toast.success(
        "Resume uploaded successfully."
      );

      setFile(null);

      document.querySelector(
        'input[type="file"]'
      ).value = "";

      await fetchResume();
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Upload failed."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteResume(resume._id);

      setResume(null);
      setShowDeleteConfirm(false);

      toast.success(
        "Resume deleted successfully."
      );
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Delete failed."
      );
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">
          Resume
        </h1>

        <p className="mt-2 text-slate-400">
          Upload and manage your latest
          resume.
        </p>
      </div>

      {/* Upload Card */}
      <div className="rounded-xl bg-slate-900 p-6">
        <input
          type="file"
          accept=".pdf"
          onChange={(event) =>
            setFile(event.target.files[0])
          }
          className="mb-4 block w-full text-white"
        />

        <button
          onClick={handleUpload}
          disabled={loading}
          className="rounded-lg bg-cyan-500 px-6 py-3 text-white transition hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading
            ? "Uploading..."
            : "Upload Resume"}
        </button>
      </div>

      {/* Current Resume */}
      {resume && (
        <div className="rounded-xl bg-slate-900 p-6">
          <h2 className="mb-4 text-xl font-semibold text-white">
            Current Resume
          </h2>

          <p className="mb-5 text-slate-300">
            {resume.fileName}
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href={resume.fileUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg bg-green-500 px-5 py-2 text-white transition hover:bg-green-600"
            >
              View Resume
            </a>

            <button
              onClick={() =>
                setShowDeleteConfirm(true)
              }
              className="rounded-lg bg-red-500 px-5 py-2 text-white transition hover:bg-red-600"
            >
              Delete
            </button>
          </div>

          {/* Delete Confirmation */}
          {showDeleteConfirm && (
            <div className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 p-5">
              <h3 className="text-lg font-semibold text-white">
                Delete Resume?
              </h3>

              <p className="mt-2 text-slate-300">
                This action cannot be
                undone. Are you sure you
                want to delete your
                current resume?
              </p>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={handleDelete}
                  className="rounded-lg bg-red-500 px-5 py-2 font-semibold text-white transition hover:bg-red-600"
                >
                  Yes, Delete
                </button>

                <button
                  onClick={() =>
                    setShowDeleteConfirm(
                      false
                    )
                  }
                  className="rounded-lg bg-slate-700 px-5 py-2 font-semibold text-white transition hover:bg-slate-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Resume;