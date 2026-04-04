import clsx from "clsx";

export default function ChatMessage({ message, isOwn }) {
  const time = new Date(message.createdAt).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={clsx("flex gap-2 mb-3", isOwn ? "flex-row-reverse" : "flex-row")}>
      <div
        className={clsx(
          "max-w-[72%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed",
          isOwn
            ? "bg-leaf-600 text-white rounded-tr-sm"
            : "bg-white border border-[var(--border)] text-earth rounded-tl-sm shadow-warm-sm"
        )}
      >
        <p>{message.content}</p>
        <p className={clsx("text-[10px] mt-1", isOwn ? "text-leaf-200 text-right" : "text-muted")}>
          {time}
          {isOwn && message.read && <span className="ml-1">✓✓</span>}
        </p>
      </div>
    </div>
  );
}
