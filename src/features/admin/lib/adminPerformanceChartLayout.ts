export const adminPerformanceChartWidth = 880
export const adminPerformanceChartHeight = 260
export const adminPerformanceChartPadding = {
  top: 24,
  right: 16,
  bottom: 40,
  left: 32,
}

export function adminPerformanceChartAxisLabelIndexes(
  pointCount: number,
): number[] {
  if (pointCount <= 1) {
    return [0]
  }

  const step = pointCount <= 8 ? 1 : Math.ceil(pointCount / 6)
  const indexes: number[] = []

  for (let index = 0; index < pointCount; index += step) {
    indexes.push(index)
  }

  if (indexes[indexes.length - 1] !== pointCount - 1) {
    indexes.push(pointCount - 1)
  }

  return indexes
}

export function adminPerformanceChartPlotDimensions() {
  const plotWidth =
    adminPerformanceChartWidth -
    adminPerformanceChartPadding.left -
    adminPerformanceChartPadding.right
  const plotHeight =
    adminPerformanceChartHeight -
    adminPerformanceChartPadding.top -
    adminPerformanceChartPadding.bottom

  return { plotWidth, plotHeight }
}

export function yAxisTicks(maxValue: number): number[] {
  const ceiling = Math.max(Math.ceil(maxValue), 1)

  if (ceiling <= 6) {
    return Array.from({ length: ceiling + 1 }, (_, index) => index)
  }

  const step = Math.max(1, Math.ceil(ceiling / 4))
  const ticks: number[] = []

  for (let value = 0; value <= ceiling; value += step) {
    ticks.push(value)
  }

  if (ticks[ticks.length - 1] !== ceiling) {
    ticks.push(ceiling)
  }

  return ticks
}
