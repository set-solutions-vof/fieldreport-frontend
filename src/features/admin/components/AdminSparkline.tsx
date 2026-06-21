import { useMemo, useRef, useState, type PointerEvent } from 'react'
import type { AdminSparklineProps } from '@/typing/adminHomeView'
import {
  pointerIndexInSvgPlot,
  svgPointToScreenPx,
} from '../lib/adminChartHover'
import { formatAdminChartPointLabel } from '../lib/adminHomeFormat'
import { AdminHoverTooltip } from './AdminHoverTooltip'

const sparklineHeight = 52
const plotTop = 8

function buildSparklineLinePath(
  points: ReadonlyArray<{ x: number; y: number }>,
): string {
  if (points.length === 0) {
    return ''
  }

  let path = `M ${points[0].x} ${points[0].y}`

  for (let index = 1; index < points.length; index += 1) {
    path += ` L ${points[index].x} ${points[index].y}`
  }

  return path
}

function buildSparklineAreaPath(
  points: ReadonlyArray<{ x: number; y: number }>,
  baselineY: number,
  viewWidth: number,
): string {
  const linePath = buildSparklineLinePath(points)

  if (linePath === '') {
    return ''
  }

  return `${linePath} L ${viewWidth} ${baselineY} L 0 ${baselineY} Z`
}

export function AdminSparkline({ points, valueLabel }: AdminSparklineProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [hoverIndex, setHoverIndex] = useState<number | null>(null)
  const [tooltipAnchor, setTooltipAnchor] = useState<{
    clientX: number
    clientY: number
  } | null>(null)

  const viewWidth = Math.max(points.length * 14, 200)
  const baselineY = sparklineHeight - 2
  const plotHeight = baselineY - plotTop

  const pointCoordinates = useMemo(() => {
    if (points.length === 0) {
      return []
    }

    const maxValue = Math.max(...points.map((point) => point.value), 1)

    return points.map((point, index) => {
      const x = (index / Math.max(points.length - 1, 1)) * viewWidth
      const y = plotTop + plotHeight - (point.value / maxValue) * plotHeight
      return { x, y, point, maxValue }
    })
  }, [plotHeight, points, viewWidth])

  if (points.length === 0) {
    return (
      <div className="[width:100%] [background:color-mix(in_oklch,var(--fr-accent)_4%,var(--fr-surface))]">
        <svg
          className="block [width:100%]"
          height={sparklineHeight}
          viewBox={`0 0 ${viewWidth} ${sparklineHeight}`}
          preserveAspectRatio="none"
          aria-hidden
        >
          <line
            x1="0"
            y1={baselineY * 0.55}
            x2={viewWidth}
            y2={baselineY * 0.55}
            stroke="var(--fr-border)"
            strokeWidth="1.5"
            strokeDasharray="3 4"
          />
        </svg>
      </div>
    )
  }

  const linePath = buildSparklineLinePath(pointCoordinates)
  const areaPath = buildSparklineAreaPath(pointCoordinates, baselineY, viewWidth)
  const activePoint = hoverIndex === null ? null : points[hoverIndex]
  const activeCoordinate =
    hoverIndex === null ? null : pointCoordinates[hoverIndex]

  function updateHover(clientX: number): void {
    const svg = svgRef.current
    if (svg === null) {
      return
    }

    const index = pointerIndexInSvgPlot(
      clientX,
      svg,
      0,
      viewWidth,
      points.length,
    )

    if (index === null) {
      setHoverIndex(null)
      setTooltipAnchor(null)
      return
    }

    const coordinate = pointCoordinates[index]
    const anchor = svgPointToScreenPx(svg, coordinate.x, coordinate.y)

    setHoverIndex(index)
    setTooltipAnchor(anchor)
  }

  function handlePointerMove(event: PointerEvent<SVGRectElement>): void {
    updateHover(event.clientX)
  }

  function handlePointerLeave(): void {
    setHoverIndex(null)
    setTooltipAnchor(null)
  }

  return (
    <div className="relative [width:100%] [background:linear-gradient(to_bottom,color-mix(in_oklch,var(--fr-accent)_12%,transparent),transparent)]">
      <svg
        ref={svgRef}
        className="block [width:100%]"
        height={sparklineHeight}
        viewBox={`0 0 ${viewWidth} ${sparklineHeight}`}
        preserveAspectRatio="none"
        role="img"
        aria-label={valueLabel}
      >
        <path
          d={areaPath}
          fill="color-mix(in oklch, var(--fr-accent) 20%, transparent)"
        />
        {activeCoordinate !== null && (
          <line
            x1={activeCoordinate.x}
            y1={plotTop}
            x2={activeCoordinate.x}
            y2={baselineY}
            stroke="var(--fr-accent)"
            strokeWidth="2"
          />
        )}
        <path
          d={linePath}
          fill="none"
          stroke="var(--fr-accent)"
          strokeWidth="2"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          opacity={hoverIndex === null ? 1 : 0.35}
        />
        {activeCoordinate !== null && (
          <>
            <circle
              cx={activeCoordinate.x}
              cy={activeCoordinate.y}
              r="8"
              fill="var(--fr-surface)"
              stroke="var(--fr-accent)"
              strokeWidth="2"
            />
            <circle
              cx={activeCoordinate.x}
              cy={activeCoordinate.y}
              r="4"
              fill="var(--fr-accent)"
            />
          </>
        )}
        <rect
          x={0}
          y={0}
          width={viewWidth}
          height={sparklineHeight}
          fill="transparent"
          className="[cursor:crosshair]"
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
        />
      </svg>

      {activePoint !== null &&
        tooltipAnchor !== null &&
        activeCoordinate !== null && (
          <AdminHoverTooltip
            date={formatAdminChartPointLabel(activePoint)}
            label={`${valueLabel}: ${activePoint.value}`}
            clientX={tooltipAnchor.clientX}
            clientY={tooltipAnchor.clientY}
            preferBelow={activeCoordinate.y < plotTop + 18}
          />
        )}
    </div>
  )
}
