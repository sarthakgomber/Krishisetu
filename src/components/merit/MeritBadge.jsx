import { getMeritTier, getMeritLabel } from "@/lib/merit";
import clsx from "clsx";

const tierConfig = {
  gold: {
    cls: "bg-amber-50 text-amber-700 border-amber-200",
    icon: "🥇",
    dot: "bg-amber-400",
  },
  silver: {
    cls: "bg-slate-50 text-slate-600 border-slate-200",
    icon: "🥈",
    dot: "bg-slate-400",
  },
  bronze: {
    cls: "bg-orange-50 text-orange-700 border-orange-200",
    icon: "🥉",
    dot: "bg-orange-400",
  },
  unranked: {
    cls: "bg-soil-50 text-soil-600 border-soil-200",
    icon: "🌱",
    dot: "bg-soil-400",
  },
};

export default function MeritBadge({ score = 0, showScore = true, size = "sm" }) {
  const tier = getMeritTier(score);
  const { cls, icon, dot } = tierConfig[tier];

  const sizes = {
    sm: "text-xs px-2 py-0.5 gap-1",
    md: "text-sm px-3 py-1 gap-1.5",
    lg: "text-base px-4 py-1.5 gap-2",
  };

  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full font-semibold border transition-all",
        cls,
        sizes[size]
      )}
    >
      <span className="text-[1em]">{icon}</span>
      <span>{getMeritLabel(score)}</span>
      {showScore && (
        <span className="opacity-60 font-normal">· {score}</span>
      )}
    </span>
  );
}