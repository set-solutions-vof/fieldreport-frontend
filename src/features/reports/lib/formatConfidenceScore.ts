export function formatConfidenceScore(confidenceScore: number): string {
  return `${Math.round(confidenceScore * 100)}%`
}
