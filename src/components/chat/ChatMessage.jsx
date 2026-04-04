import clsx from "clsx";

export default function ChatMessage({ message, isOwn }) {
  const time = new Date(message.createdAt).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={clsx("flex gap-2 mb-2", isOwn ? "flex-row-reverse" : "flex-row")}>
      {!isOwn && (
        <div className="w-6 h-6 rounded-full bg-leaf-100 border border-leaf-200 flex items-center justify-center shrink-0 mt-auto mb-1">
          <span className="text-leaf-700 text-[10px] font-bold">F</span>
        </div>
      )}
      <div
        className={clsx(
          "max-w-[72%] px-4 py-2.5 text-sm leading-relaxed",
          isOwn
            ? "bg-leaf-600 text-white rounded-2xl rounded-br-sm shadow-warm"
            : "bg-white border border-[var(--border)] text-earth rounded-2xl rounded-bl-sm shadow-warm-sm"
        )}
      >
        <p className="whitespace-pre-wrap break-words">{message.content}</p>
        <div className={clsx("flex items-center gap-1 mt-1.5", isOwn ? "justify-end" : "justify-start")}>
          <span className={clsx("text-[10px]", isOwn ? "text-leaf-200" : "text-muted")}>{time}</span>
          {isOwn && (
            <span className={clsx("text-[10px]", message.read ? "text-leaf-300" : "text-leaf-400/60")}>
              {message.read ? "✓✓" : "✓"}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}