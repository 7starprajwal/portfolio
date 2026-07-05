function ProjectFilter({
  filters = [],
  selected,
  setSelected,
  projectData = [],
}) {
  return (
    <div className="mb-12 flex flex-wrap justify-center gap-4">
      {filters.map((filter) => {
        const count =
          filter === "All"
            ? projectData.length
            : projectData.filter(
                (project) =>
                  project.category === filter
              ).length;

        return (
          <button
            key={filter}
            onClick={() =>
              setSelected(filter)
            }
            className={`rounded-full px-5 py-2 font-medium transition ${
              selected === filter
                ? "bg-cyan-500 text-slate-950"
                : "bg-slate-800 text-white hover:bg-slate-700"
            }`}
          >
            {filter} ({count})
          </button>
        );
      })}
    </div>
  );
}

export default ProjectFilter;