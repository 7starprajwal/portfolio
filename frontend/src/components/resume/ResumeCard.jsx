import { motion } from "framer-motion";
import {
  FaCalendarAlt,
  FaFilePdf,
  FaFileAlt,
  FaWeightHanging,
} from "react-icons/fa";

function ResumeCard({ resume }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{
        y: -6,
      }}
      className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-xl"
    >
      {/* Header */}

      <div className="bg-gradient-to-r from-cyan-500/10 via-transparent to-cyan-500/10 p-10">
        <div className="flex flex-col items-center">
          <div className="rounded-full bg-red-500/10 p-8">
            <FaFilePdf className="text-7xl text-red-500" />
          </div>

          <h2 className="mt-6 text-3xl font-bold text-white">
            Professional Resume
          </h2>

          <p className="mt-3 break-all text-center text-slate-400">
            {resume.fileName}
          </p>
        </div>
      </div>

      {/* Information */}

      <div className="grid gap-6 p-10 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 text-center">
          <FaFileAlt className="mx-auto text-3xl text-cyan-400" />

          <h3 className="mt-4 text-lg font-semibold text-white">
            Document
          </h3>

          <p className="mt-2 text-slate-400">
            PDF
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 text-center">
          <FaWeightHanging className="mx-auto text-3xl text-cyan-400" />

          <h3 className="mt-4 text-lg font-semibold text-white">
            Size
          </h3>

          <p className="mt-2 text-slate-400">
            {(resume.fileSize / 1024).toFixed(1)} KB
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 text-center">
          <FaCalendarAlt className="mx-auto text-3xl text-cyan-400" />

          <h3 className="mt-4 text-lg font-semibold text-white">
            Updated
          </h3>

          <p className="mt-2 text-slate-400">
            {new Date(
              resume.updatedAt
            ).toLocaleDateString()}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default ResumeCard;