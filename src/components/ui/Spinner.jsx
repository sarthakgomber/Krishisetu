import clsx from "clsx";

export default function Spinner({ size = "md", className = "" }) {
  const sizes = { sm: "h-4 w-4", md: "h-6 w-6", lg: "h-10 w-10" };
  return (
    <div className={clsx("relative", sizes[size], className)}>
      <svg className={clsx("animate-spin text-leaf-200", sizes[size], "absolute inset-0")} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      </svg>
      <svg className={clsx("animate-spin text-leaf-600", sizes[size], "absolute inset-0")} viewBox="0 0 24 24" fill="none">
        <path fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
      </svg>
    </div>
  );
}