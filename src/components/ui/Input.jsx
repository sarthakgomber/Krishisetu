import clsx from "clsx";

export default function Input({
  label,
  error,
  hint,
  className = "",
  as: Tag = "input",
  ...props
}) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-earth">
          {label}
          {props.required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}
      <Tag
        className={clsx(
          "input-base",
          error && "!border-red-400 !ring-red-100",
          Tag === "textarea" && "resize-none",
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
      {hint && !error && <p className="text-xs text-muted">{hint}</p>}
    </div>
  );
}
