const config = {
  pending: {
    label: "Pending",
    cls: "bg-amber-50 text-amber-700 border-amber-200",
    dot: "bg-amber-400",
  },
  confirmed: {
    label: "Confirmed",
    cls: "bg-blue-50 text-blue-700 border-blue-200",
    dot: "bg-blue-400",
  },
  completed: {
    label: "Completed",
    cls: "bg-leaf-50 text-leaf-700 border-leaf-200",
    dot: "bg-leaf-500",
  },
  cancelled: {
    label: "Cancelled",
    cls: "bg-red-50 text-red-600 border-red-200",
    dot: "bg-red-400",
  },
};

export default function OrderStatusBadge({ status }) {
  const { label, cls, dot } = config[status] || config.pending;
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border whitespace-nowrap ${cls}`}>
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dot}`} />
      {label}
    </span>
  );
}