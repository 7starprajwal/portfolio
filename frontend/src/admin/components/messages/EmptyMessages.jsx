function EmptyMessages() {
  return (
    <div className="rounded-2xl border border-dashed border-slate-700 py-20 text-center">
      <h2 className="text-2xl font-semibold text-white">
        No Messages Found
      </h2>

      <p className="mt-3 text-slate-400">
        Try changing your search or filters.
      </p>
    </div>
  );
}

export default EmptyMessages;