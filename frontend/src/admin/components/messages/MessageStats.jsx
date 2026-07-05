function MessageStats({ stats }) {
  const cards = [
    {
      title: "Total",
      value: stats.total,
      color: "border-cyan-500",
    },
    {
      title: "Unread",
      value: stats.unread,
      color: "border-red-500",
    },
    {
      title: "Read",
      value: stats.read,
      color: "border-green-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {cards.map((card) => (
        <div
          key={card.title}
          className={`rounded-xl border-l-4 ${card.color} bg-slate-900 p-5 shadow-lg`}
        >
          <p className="text-slate-400">
            {card.title}
          </p>

          <h2 className="mt-2 text-4xl font-bold text-white">
            {card.value}
          </h2>
        </div>
      ))}
    </div>
  );
}

export default MessageStats;