export function getMatchTier(
  score: number,
) {
  if (score >= 90) {
    return "Exceptional Match";
  }

  if (score >= 80) {
    return "High Potential Match";
  }

  if (score >= 70) {
    return "Strong Match";
  }

  return "Possible Match";
}