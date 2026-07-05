
function Pagination({
  currentPage,
  totalPages,
  setCurrentPage,
}) {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
      <button
        onClick={() =>
          setCurrentPage((prev) => prev - 1)
        }
        disabled={currentPage === 1}
        className="rounded-lg border border-cyan-500 px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-40"
      >
        Previous
      </button>

      {Array.from(
        { length: totalPages },
        (_, index) => (
          <button
            key={index}
            onClick={() =>
              setCurrentPage(index + 1)
            }
            className={`h-10 w-10 rounded-full transition ${
              currentPage === index + 1
                ? "bg-cyan-500 text-black"
                : "border border-cyan-500 text-white hover:bg-cyan-500 hover:text-black"
            }`}
          >
            {index + 1}
          </button>
        )
      )}

      <button
        onClick={() =>
          setCurrentPage((prev) => prev + 1)
        }
        disabled={currentPage === totalPages}
        className="rounded-lg border border-cyan-500 px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;

