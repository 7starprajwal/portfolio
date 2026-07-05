import { motion } from "framer-motion";

const categories = [
  "All",
  "Frontend",
  "Backend",
  "Full Stack",
  "Cloud",
  "Database",
  "Programming",
  "Machine Learning",
];

function CertificateFilter({
  selectedCategory,
  setSelectedCategory,
}) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {categories.map((category) => (
        <motion.button
          key={category}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setSelectedCategory(category)}
          className={`rounded-full border px-5 py-2 text-sm font-medium transition-all duration-300 ${
            selectedCategory === category
              ? "border-cyan-500 bg-cyan-500 text-slate-950"
              : "border-slate-700 bg-slate-900/60 text-slate-300 hover:border-cyan-500 hover:text-cyan-400"
          }`}
        >
          {category}
        </motion.button>
      ))}
    </div>
  );
}

export default CertificateFilter;