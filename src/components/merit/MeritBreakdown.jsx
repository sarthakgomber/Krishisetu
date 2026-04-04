export default function MeritBreakdown({ score = 0, breakdown = {} }) {
  const { avgRating = 0, txScore = 0, responseScore = 0 } = breakdown;

  const ratingPoints = Math.round(((avgRating || 0) / 5) * 40);
  const txPoints = Math.round(Math.min(35, txScore > 0 ? (Math.log(txScore + 1) / Math.log(101)) * 35 : 0));
  const responsePoints = responseScore === null ? 0 : responseScore < 1 ? 25 : responseScore < 6 ? 18 : responseScore < 24 ? 10 : 0;

  const bars = [
    { label: "Avg Rating", points: ratingPoints, max: 40, color: "bg-amber-400", icon: "⭐" },
    { label: "Transactions", points: txPoints, max: 35, color: "bg-leaf-500", icon: "📦" },
    { label: "Response Time", points: responsePoints, max: 25, color: "bg-sky-400", icon: "⚡" },
  ];

  const tier = score >= 80 ? { label: "Gold", cls: "text-amber-600 bg-amber-50 border-amber-200", icon: "🥇" }
    : score >= 60 ? { label: "Silver", cls: "text-slate-600 bg-slate-50 border-slate-200", icon: "🥈" }
    : score >= 40 ? { label: "Bronze", cls: "text-orange-600 bg-orange-50 border-orange-200", icon: "🥉" }
    : { label: "Unranked", cls: "text-soil-600 bg-soil-50 border-soil-200", icon: "🌱" };

  return (
    <div className="card p-5 space-y-5">
      {/* Score header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display text-base font-semibold text-earth">Merit Score</h3>
          <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-0.5 rounded-full border mt-1 ${tier.cls}`}>
            {tier.icon} {tier.label}
          </span>
        </div>
        <div className="text-right">
          <span className="font-display text-4xl font-bold text-earth">{score}</span>
          <span className="text-sm font-normal text-muted">/100</span>
        </div>
      </div>

      {/* Score ring visual */}
      <div className="h-2 bg-soil-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-leaf-400 to-leaf-600 rounded-full transition-all duration-700"
          style={{ width: `${score}%` }}
        />
      </div>

      {/* Breakdown bars */}
      <div className="space-y-4 pt-1">
        {bars.map((bar) => (
          <div key={bar.label}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-sm">{bar.icon}</span>
                <span className="text-sm font-medium text-earth">{bar.label}</span>
              </div>
              <span className="text-xs font-semibold text-earth tabular-nums">
                {bar.points}
                <span className="text-muted font-normal">/{bar.max}</span>
              </span>
            </div>
            <div className="h-1.5 bg-soil-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${bar.color}`}
                style={{ width: `${(bar.points / bar.max) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="pt-2 border-t border-[var(--border)]">
        <div className="flex justify-between text-[10px] text-muted">
          <span>Rating ×40 pts</span>
          <span>Transactions ×35 pts</span>
          <span>Response ×25 pts</span>
        </div>
      </div>
    </div>
  );
}