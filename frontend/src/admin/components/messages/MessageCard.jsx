function MessageCard({
  message,
  onMarkRead,
  onDelete,
}) {
  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6 transition hover:border-cyan-500">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-cyan-400">
            {message.name}
          </h2>

          <p className="text-slate-400">
            {message.email}
          </p>

          <p className="mt-1 text-sm text-slate-500">
            {new Date(message.createdAt).toLocaleString()}
          </p>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-sm font-semibold text-white ${
            message.isRead
              ? "bg-green-600"
              : "bg-red-600"
          }`}
        >
          {message.isRead ? "Read" : "Unread"}
        </span>
      </div>

      <h3 className="mt-5 text-lg font-semibold text-white">
        {message.subject}
      </h3>

      <p className="mt-3 whitespace-pre-wrap text-slate-300">
        {message.message}
      </p>

      <div className="mt-6 flex gap-3">
        {!message.isRead && (
          <button
            onClick={() => onMarkRead(message._id)}
            className="rounded-lg bg-green-600 px-4 py-2 text-white transition hover:bg-green-500"
          >
            Mark as Read
          </button>
        )}

        <button
          onClick={() => onDelete(message._id)}
          className="rounded-lg bg-red-600 px-4 py-2 text-white transition hover:bg-red-500"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default MessageCard;