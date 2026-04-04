export function calculateMeritScore(avgRating, completedOrders, avgResponseTimeHours, maxOrders = 100) {
  const ratingScore = ((avgRating || 0) / 5) * 40;

  const txScore =
    completedOrders > 0
      ? (Math.log(completedOrders + 1) / Math.log(maxOrders + 1)) * 35
      : 0;

  let responseScore = 0;
  if (avgResponseTimeHours === null || avgResponseTimeHours === undefined) {
    responseScore = 0;
  } else if (avgResponseTimeHours < 1) {
    responseScore = 25;
  } else if (avgResponseTimeHours < 6) {
    responseScore = 18;
  } else if (avgResponseTimeHours < 24) {
    responseScore = 10;
  }

  const total = Math.round(ratingScore + txScore + responseScore);
  return Math.min(100, Math.max(0, total));
}

export function getMeritTier(score) {
  if (score >= 80) return "gold";
  if (score >= 60) return "silver";
  if (score >= 40) return "bronze";
  return "unranked";
}

export function getMeritLabel(score) {
  const tier = getMeritTier(score);
  return tier.charAt(0).toUpperCase() + tier.slice(1);
}
