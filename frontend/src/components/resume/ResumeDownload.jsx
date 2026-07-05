import { motion } from "framer-motion";
import {
  FaDownload,
  FaExternalLinkAlt,
  FaArrowRight,
  FaFilePdf,
} from "react-icons/fa";

function ResumeDownload({ resume }) {
  const hasResume =
    resume &&
    (resume.fileUrl || resume.downloadUrl);

  return (
    <motion.section
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mx-auto mt-12 max-w-4xl"
    >
      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-10 shadow-xl">
        <div className="flex items-center justify-center gap-3">
          <FaFilePdf className="text-3xl text-cyan-400" />

          <h2 className="text-center text-3xl font-bold text-white">
            {resume?.title || "Access My Resume"}
          </h2>
        </div>

        <p className="mx-auto mt-5 max-w-2xl text-center text-lg leading-8 text-slate-400">
          View my latest resume online or download a PDF copy for
          future reference.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {/* View Resume */}
          <a
            href={hasResume ? resume.fileUrl : "#"}
            target={hasResume ? "_blank" : undefined}
            rel={
              hasResume
                ? "noopener noreferrer"
                : undefined
            }
            onClick={(event) => {
              if (!hasResume) {
                event.preventDefault();
              }
            }}
            className={`group rounded-2xl border p-8 transition-all duration-300 ${
              hasResume
                ? "border-cyan-500 bg-slate-950 hover:-translate-y-1 hover:bg-cyan-500"
                : "cursor-not-allowed border-slate-700 bg-slate-800 opacity-60"
            }`}
          >
            <div className="flex items-center justify-between">
              <FaExternalLinkAlt
                className={`text-3xl ${
                  hasResume
                    ? "text-cyan-400 group-hover:text-white"
                    : "text-slate-500"
                }`}
              />

              {hasResume && (
                <FaArrowRight className="text-white opacity-0 transition-all group-hover:translate-x-2 group-hover:opacity-100" />
              )}
            </div>

            <h3 className="mt-8 text-2xl font-bold text-white">
              View Online
            </h3>

            <p className="mt-3 leading-7 text-slate-400">
              Open the complete resume in a new browser tab.
            </p>
          </a>

          {/* Download Resume */}
          <a
            href={
              hasResume
                ? resume.downloadUrl
                : "#"
            }
            download
            onClick={(event) => {
              if (!hasResume) {
                event.preventDefault();
              }
            }}
            className={`group rounded-2xl p-8 transition-all duration-300 ${
              hasResume
                ? "bg-cyan-500 hover:-translate-y-1 hover:bg-cyan-600"
                : "cursor-not-allowed bg-slate-700 opacity-60"
            }`}
          >
            <div className="flex items-center justify-between">
              <FaDownload className="text-3xl text-white" />

              {hasResume && (
                <FaArrowRight className="text-white opacity-0 transition-all group-hover:translate-x-2 group-hover:opacity-100" />
              )}
            </div>

            <h3 className="mt-8 text-2xl font-bold text-white">
              Download PDF
            </h3>

            <p className="mt-3 leading-7 text-cyan-100">
              Save the latest resume to your device.
            </p>
          </a>
        </div>

        <div className="mt-10 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-5">
          <p className="text-center leading-7 text-slate-300">
            {hasResume
              ? "Recruiters are encouraged to download the latest version of my resume for interview and hiring purposes."
              : "No resume has been uploaded yet."}
          </p>
        </div>
      </div>
    </motion.section>
  );
}

export default ResumeDownload;