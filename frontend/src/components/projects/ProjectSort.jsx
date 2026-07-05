function ProjectSort({
  sort,
  setSort,
}) {
  return (
    <div className="flex justify-end mb-8">
      <select
        value={sort}
        onChange={(e) =>
          setSort(e.target.value)
        }
        className="rounded-lg border border-cyan-500 bg-slate-900 px-4 py-3 text-white outline-none"
      >
        <option value="newest">
          Newest
        </option>

        <option value="oldest">
          Oldest
        </option>

        <option value="az">
          A → Z
        </option>

        <option value="za">
          Z → A
        </option>
      </select>
    </div>
  );
}

export default ProjectSort;