function MessagePagination({
  page,
  totalPages,
  onPageChange,
}) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-3">
      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="rounded-lg bg-slate-800 px-4 py-2 text-white disabled:opacity-40"
      >
        Previous
      </button>

      <span className="text-white">
        Page {page} of {totalPages}
      </span>

      <button
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        className="rounded-lg bg-slate-800 px-4 py-2 text-white disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
}

export default MessagePagination;