import { motion } from "framer-motion";

function ContactHero() {
  return (
    <section className="relative overflow-hidden border-b border-slate-800">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-cyan-500/10" />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-6 py-24 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 text-5xl font-bold text-white md:text-6xl"
        >
          Contact Me
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-3xl text-lg leading-8 text-slate-400"
        >
          Have a project in mind, an internship opportunity, or just want to
          connect? I'd love to hear from you. Feel free to reach out using the
          contact form below or through my social platforms.
        </motion.p>
      </div>
    </section>
  );
}

export default ContactHero;