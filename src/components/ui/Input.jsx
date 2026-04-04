import clsx from "clsx";

export default function Input({ label, error, hint, className = "", as: Tag = "input", ...props }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-earth flex items-center gap-1">
          {label}
          {props.required && <span className="text-red-500">*</span>}
        </label>
      )}
      <Tag
        className={clsx(
          "input-base transition-all duration-150",
          error && "!border-red-400 !ring-2 !ring-red-100 bg-red-50/30",
          Tag === "textarea" && "resize-none",
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-xs text-red-500 flex items-center gap-1">
          <svg className="w-3 h-3 shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
          {error}
        </p>
      )}
      {hint && !error && <p className="text-xs text-muted">{hint}</p>}
    </div>
  );
}