export function pointerIndexInSvgPlot(
  clientX: number,
  svg: SVGSVGElement,
  plotLeft: number,
  plotWidth: number,
  pointCount: number,
): number | null {
  if (pointCount === 0) {
    return null
  }

  const screenPoint = svg.createSVGPoint()
  screenPoint.x = clientX
  screenPoint.y = 0

  const inverseMatrix = svg.getScreenCTM()?.inverse()
  if (inverseMatrix === undefined) {
    return null
  }

  const plotX = screenPoint.matrixTransform(inverseMatrix).x - plotLeft

  if (plotX < 0 || plotX > plotWidth) {
    return null
  }

  if (pointCount === 1) {
    return 0
  }

  const index = Math.round((plotX / plotWidth) * (pointCount - 1))
  return Math.max(0, Math.min(pointCount - 1, index))
}

export function svgPointToScreenPx(
  svg: SVGSVGElement,
  x: number,
  y: number,
): { clientX: number; clientY: number } | null {
  const svgPoint = svg.createSVGPoint()
  svgPoint.x = x
  svgPoint.y = y

  const screenMatrix = svg.getScreenCTM()
  if (screenMatrix === null) {
    return null
  }

  const screenPoint = svgPoint.matrixTransform(screenMatrix)

  return {
    clientX: screenPoint.x,
    clientY: screenPoint.y,
  }
}
