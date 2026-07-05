function MessageFilters({
  search,
  setSearch,
  status,
  setStatus,
  sort,
  setSort,
}) {
  return (
    <div className="grid gap-4 rounded-xl bg-slate-900 p-5 md:grid-cols-3">
      <input
        type="text"
        placeholder="Search messages..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="rounded-lg border border-slate-700 bg-slate-800 p-3 text-white"
      />

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="rounded-lg border border-slate-700 bg-slate-800 p-3 text-white"
      >
        <option value="all">All</option>
        <option value="unread">Unread</option>
        <option value="read">Read</option>
      </select>

      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="rounded-lg border border-slate-700 bg-slate-800 p-3 text-white"
      >
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
        <option value="name_asc">A-Z</option>
        <option value="name_desc">Z-A</option>
      </select>
    </div>
  );
}

export default MessageFilters;