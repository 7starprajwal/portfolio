import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FaTimes,
  FaDownload,
  FaExternalLinkAlt,
  FaCalendarAlt,
  FaBuilding,
  FaIdBadge,
  FaTag,
  FaStar,
  FaFilePdf,
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

  const imageUrl =
    certificate.image?.url ||
    "/certificate-placeholder.png";

  const issueDate = certificate.issueDate
    ? new Date(
        certificate.issueDate
      ).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "N/A";
    console.log(certificate);
    return (
  <AnimatePresence>
    <motion.div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.95,
          y: 30,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        exit={{
          opacity: 0,
          scale: 0.95,
          y: 30,
        }}
        transition={{
          duration: 0.3,
        }}
        onClick={(e) => e.stopPropagation()}
        className="relative mx-auto my-10 w-full max-w-6xl rounded-2xl border border-slate-800 bg-slate-950 shadow-2xl"
      >
        {/* Close Button */}

        <button
          onClick={onClose}
          className="absolute right-5 top-5 z-20 rounded-full bg-slate-800 p-3 text-white transition hover:bg-red-500"
        >
          <FaTimes />
        </button>

        {/* Header */}

        <div className="border-b border-slate-800 p-8">
          <div className="flex flex-wrap items-center gap-3">

            {certificate.featured && (
              <span className="flex items-center gap-2 rounded-full bg-yellow-500/20 px-4 py-2 text-sm font-semibold text-yellow-400">
                <FaStar />
                Featured
              </span>
            )}

            <span className="flex items-center gap-2 rounded-full bg-cyan-500/20 px-4 py-2 text-sm font-semibold text-cyan-400">
              <FaTag />
              {certificate.category || "Certificate"}
            </span>

          </div>

          <h2 className="mt-5 text-4xl font-bold text-white">
            {certificate.title}
          </h2>

          <div className="mt-4 flex flex-wrap gap-6 text-slate-400">

            <div className="flex items-center gap-2">
              <FaBuilding />
              {certificate.issuer}
            </div>

            <div className="flex items-center gap-2">
              <FaCalendarAlt />
              {issueDate}
            </div>

            {certificate.credentialId && (
              <div className="flex items-center gap-2">
                <FaIdBadge />
                {certificate.credentialId}
              </div>
            )}

          </div>

          {certificate.description && (
            <div className="mt-8">
              <h3 className="mb-3 text-xl font-semibold text-white">
                Description
              </h3>

     

              <p className="leading-8 text-slate-300">
                {certificate.description}
              </p>
            </div>
          )}
        </div>

        {/* Body */}

        <div className="space-y-10 p-8">

          {/* Certificate Image */}

          <div>
            <h3 className="mb-4 text-2xl font-semibold text-white">
              Certificate Preview
            </h3>

            <img
              src={imageUrl}
              alt={certificate.title}
              className="w-full rounded-2xl border border-slate-800 object-cover"
            />
          </div>

                    {/* PDF Preview */}

          <div>
            <h3 className="mb-4 flex items-center gap-2 text-2xl font-semibold text-white">
              <FaFilePdf className="text-red-500" />
              Certificate PDF
            </h3>

            {pdfUrl ? (
              <div className="overflow-hidden rounded-2xl border border-slate-800">
                <iframe
                  src={`${pdfUrl}#toolbar=0`}
                  title={certificate.title}
                  className="h-[650px] w-full bg-slate-900"
                />
              </div>
            ) : (
              <div className="flex h-48 items-center justify-center rounded-2xl border border-dashed border-slate-700 bg-slate-900 text-slate-400">
                PDF not available for this certificate.
              </div>
            )}
          </div>

          {/* Actions */}

          <div className="flex flex-wrap justify-end gap-4 border-t border-slate-800 pt-8">

            {pdfUrl && (
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-white transition hover:bg-cyan-400"
              >
                <FaDownload />
                Download Certificate
              </a>
            )}

            {certificate.credentialUrl && (
              <a
                href={certificate.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl border border-cyan-500 px-6 py-3 font-semibold text-cyan-400 transition hover:bg-cyan-500 hover:text-slate-950"
              >
                <FaExternalLinkAlt />
                Verify Credential
              </a>
            )}

          </div>

        </div>

      </motion.div>
    </motion.div>
  </AnimatePresence>
);

}

export default CertificateModal;