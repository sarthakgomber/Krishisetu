import { getMeritTier, getMeritLabel } from "@/lib/merit";
import clsx from "clsx";

const tierConfig = {
  gold: {
    cls: "badge-gold",
    icon: "🥇",
  },
  silver: {
    cls: "badge-silver",
    icon: "🥈",
  },
  bronze: {
    cls: "badge-bronze",
    icon: "🥉",
  },
  unranked: {
    cls: "badge-unranked",
    icon: "🌱",
  },
};

export default function MeritBadge({ score = 0, showScore = true, size = "sm" }) {
  const tier = getMeritTier(score);
  const { cls, icon } = tierConfig[tier];

  const sizes = {
    sm: "text-xs px-2 py-0.5 gap-1",
    md: "text-sm px-3 py-1 gap-1.5",
    lg: "text-base px-4 py-1.5 gap-2",
  };

  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full font-medium border",
        cls,
        sizes[size]
      )}
    >
      <span>{icon}</span>
      <span>{getMeritLabel(score)}</span>
      {showScore && <span className="opacity-70">· {score}</span>}
    </span>
  );
}
