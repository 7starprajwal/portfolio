import { FaSearch } from "react-icons/fa";

function ProjectSearch({ searchTerm, setSearchTerm }) {
  return (
    <div className="relative mx-auto mb-10 max-w-xl">
      <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

      <input
        type="text"
        placeholder="Search projects..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full rounded-xl border border-slate-700 bg-slate-900 py-4 pl-12 pr-4 text-white outline-none transition focus:border-cyan-400"
      />
    </div>
  );
}

export default ProjectSearch;