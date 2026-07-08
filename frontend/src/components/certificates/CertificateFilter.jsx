import { motion } from "framer-motion";

const sortOptions = [
  {
    label: "Newest",
    value: "newest",
  },
  {
    label: "Oldest",
    value: "oldest",
  },
  {
    label: "A-Z",
    value: "az",
  },
  {
    label: "Z-A",
    value: "za",
  },
];

function CertificateFilter({
  selectedSort,
  setSelectedSort,
}) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {sortOptions.map((option) => (
        <motion.button
          key={option.value}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setSelectedSort(option.value)}
          className={`rounded-full border px-5 py-2 text-sm font-medium transition-all duration-300 ${
            selectedSort === option.value
              ? "border-cyan-500 bg-cyan-500 text-slate-950"
              : "border-slate-700 bg-slate-900/60 text-slate-300 hover:border-cyan-500 hover:text-cyan-400"
          }`}
        >
          {option.label}
        </motion.button>
      ))}
    </div>
  );
}

export default CertificateFilter;