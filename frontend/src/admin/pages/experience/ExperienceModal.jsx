import { useEffect } from "react";
import { FaTimes } from "react-icons/fa";

import ExperienceForm from "./ExperienceForm";

function ExperienceModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  loading,
}) {
  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="relative max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-xl bg-slate-950 shadow-2xl"
      >
        <div className="sticky top-0 flex items-center justify-between border-b border-slate-800 bg-slate-950 p-5">
          <h2 className="text-2xl font-bold text-white">
            {initialData
              ? "Edit Experience"
              : "Add Experience"}
          </h2>

          <button
            onClick={onClose}
            className="text-xl text-slate-400 transition hover:text-red-500"
          >
            <FaTimes />
          </button>
        </div>

        <div className="p-6">
          <ExperienceForm
            initialData={initialData}
            onSubmit={onSubmit}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}

export default ExperienceModal;