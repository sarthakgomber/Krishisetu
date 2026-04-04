export default function MeritBreakdown({ score = 0, breakdown = {} }) {
  const { avgRating = 0, txScore = 0, responseScore = 0 } = breakdown;

  const ratingPoints = Math.round(((avgRating || 0) / 5) * 40);
  const txPoints = Math.round(Math.min(35, txScore > 0 ? (Math.log(txScore + 1) / Math.log(101)) * 35 : 0));
  const responsePoints = responseScore === null ? 0 : responseScore < 1 ? 25 : responseScore < 6 ? 18 : responseScore < 24 ? 10 : 0;

  const bars = [
    { label: "Avg Rating", points: ratingPoints, max: 40, color: "bg-amber-400" },
    { label: "Transactions", points: txPoints, max: 35, color: "bg-leaf-500" },
    { label: "Response Time", points: responsePoints, max: 25, color: "bg-sky-400" },
  ];

  return (
    <div className="card p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-base font-semibold text-earth">Merit Score</h3>
        <span className="text-2xl font-bold text-earth">{score}<span className="text-sm font-normal text-muted">/100</span></span>
      </div>

      <div className="space-y-3">
        {bars.map((bar) => (
          <div key={bar.label}>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-muted font-medium">{bar.label}</span>
              <span className="text-earth font-semibold">{bar.points}/{bar.max}</span>
            </div>
            <div className="h-2 bg-soil-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${bar.color}`}
                style={{ width: `${(bar.points / bar.max) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="pt-1 border-t border-[var(--border)]">
        <div className="flex justify-between text-xs text-muted">
          <span>Rating (×40)</span>
          <span>Transactions (×35)</span>
          <span>Response (×25)</span>
        </div>
      </div>
    </div>
  );
}
