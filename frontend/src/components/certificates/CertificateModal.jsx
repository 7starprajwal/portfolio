import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FaTimes,
  FaDownload,
  FaExternalLinkAlt,
} from "react-icons/fa";

function CertificateModal({
  certificate,
  onClose,
}) {
  useEffect(() => {
    document.body.style.overflow = certificate
      ? "hidden"
      : "auto";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [certificate, onClose]);

  if (!certificate) {
    return null;
  }

  const pdfUrl =
    certificate.certificatePdf?.url || "";

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          initial={{
            scale: 0.9,
            opacity: 0,
          }}
          animate={{
            scale: 1,
            opacity: 1,
          }}
          exit={{
            scale: 0.9,
            opacity: 0,
          }}
          transition={{
            duration: 0.25,
          }}
          onClick={(e) =>
            e.stopPropagation()
          }
          className="relative w-full max-w-5xl overflow-hidden rounded-2xl border border-slate-800 bg-slate-950"
        >
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full bg-slate-800 p-3 text-white hover:bg-red-500"
          >
            <FaTimes />
          </button>

          <div className="border-b border-slate-800 p-6">
            <h2 className="text-3xl font-bold text-white">
              {certificate.title}
            </h2>

            <p className="mt-2 text-slate-400">
              {certificate.issuer}
            </p>
          </div>

          <div className="h-[70vh] bg-slate-900">
            {pdfUrl ? (
              <iframe
                src={`${pdfUrl}#toolbar=0`}
                title={certificate.title}
                className="h-full w-full"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-slate-400">
                PDF not found.
              </div>
            )}
          </div>

          <div className="flex justify-end gap-4 border-t border-slate-800 p-6">
            {pdfUrl && (
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg bg-cyan-500 px-5 py-3 font-semibold text-white hover:bg-cyan-400"
              >
                <FaDownload />
                Download
              </a>
            )}

            {certificate.credentialUrl && (
              <a
                href={certificate.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg border border-cyan-500 px-5 py-3 font-semibold text-cyan-400 hover:bg-cyan-500 hover:text-slate-950"
              >
                <FaExternalLinkAlt />
                Verify Credential
              </a>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default CertificateModal;