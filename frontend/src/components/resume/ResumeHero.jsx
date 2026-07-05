import { motion } from "framer-motion";

function ResumeHero() {
  return (
    <section className="relative overflow-hidden border-b border-slate-800">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-cyan-500/10" />

      <div className="relative mx-auto max-w-7xl px-6 py-24">
        <motion.h1
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 text-center text-5xl font-bold text-white md:text-6xl"
        >
          Resume
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mx-auto max-w-3xl text-center text-lg leading-8 text-slate-400"
        >
          Download my latest professional resume to explore my
          technical skills, projects, internship experience,
          education, certifications, and achievements.
        </motion.p>
      </div>
    </section>
  );
}

export default ResumeHero;