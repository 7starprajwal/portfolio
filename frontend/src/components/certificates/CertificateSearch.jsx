import { FaSearch } from "react-icons/fa";

function CertificateSearch({ searchTerm, setSearchTerm }) {
  return (
    <div className="relative w-full md:max-w-md">
      <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />

      <input
        type="text"
        placeholder="Search certificates..."
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        className="
          w-full
          rounded-xl
          border
          border-slate-700
          bg-slate-900/70
          py-3
          pl-12
          pr-4
          text-white
          outline-none
          backdrop-blur-lg
          transition
          duration-300
          placeholder:text-slate-500
          focus:border-cyan-500
          focus:ring-2
          focus:ring-cyan-500/30
        "
      />
    </div>
  );
}

export default CertificateSearch;