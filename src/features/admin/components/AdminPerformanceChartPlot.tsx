import {
  adminPerformanceChartHeight,
  adminPerformanceChartPadding,
  adminPerformanceChartWidth,
} from '../lib/adminPerformanceChartLayout'
import { formatAdminAxisDate } from '../lib/adminHomeFormat'
import type { AdminPerformanceChartPlotProps } from '@/typing/adminHomeView'

export function AdminPerformanceChartPlot({
  points,
  svgRef,
  hoverIndex,
  plotWidth,
  plotHeight,
  axisMaxValue,
  gridTicks,
  pointCoordinates,
  linePoints,
  showPointMarkers,
  labelIndexes,
  activeCoordinate,
  onPointerMove,
  onPointerLeave,
}: AdminPerformanceChartPlotProps) {
  return (
    <svg
      ref={svgRef}
      className="block [min-width:100%]"
      width="100%"
      height={adminPerformanceChartHeight}
      viewBox={`0 0 ${adminPerformanceChartWidth} ${adminPerformanceChartHeight}`}
      role="img"
    >
      {gridTicks.map((tickValue) => {
        const y =
          adminPerformanceChartPadding.top +
          plotHeight -
          (tickValue / axisMaxValue) * plotHeight

        return (
          <g key={tickValue}>
            <line
              x1={adminPerformanceChartPadding.left}
              y1={y}
              x2={adminPerformanceChartPadding.left + plotWidth}
              y2={y}
              stroke="var(--fr-border)"
              strokeWidth="1"
            />
            <text
              x={adminPerformanceChartPadding.left - 8}
              y={y + 4}
              textAnchor="end"
              fill="var(--fr-text-tertiary)"
              fontSize="11"
            >
              {tickValue}
            </text>
          </g>
        )
      })}

      {activeCoordinate !== null && (
        <>
          <rect
            x={activeCoordinate.x - 14}
            y={adminPerformanceChartPadding.top}
            width={28}
            height={plotHeight}
            fill="var(--fr-accent)"
            opacity={0.1}
          />
          <line
            x1={activeCoordinate.x}
            y1={adminPerformanceChartPadding.top}
            x2={activeCoordinate.x}
            y2={
              adminPerformanceChartHeight -
              adminPerformanceChartPadding.bottom +
              4
            }
            stroke="var(--fr-accent)"
            strokeWidth="2"
          />
        </>
      )}

      <polyline
        fill="none"
        stroke="var(--fr-accent)"
        strokeWidth="2.5"
        strokeLinejoin="miter"
        strokeLinecap="butt"
        points={linePoints}
        opacity={hoverIndex === null ? 1 : 0.35}
      />

      {showPointMarkers &&
        pointCoordinates.map(({ x, y }, index) => (
          <circle
            key={points[index].date}
            cx={x}
            cy={y}
            r={hoverIndex === index ? 0 : 3}
            fill="var(--fr-accent)"
            opacity={hoverIndex === null || hoverIndex === index ? 1 : 0.15}
          />
        ))}

      {activeCoordinate !== null && (
        <>
          <circle
            cx={activeCoordinate.x}
            cy={activeCoordinate.y}
            r="10"
            fill="var(--fr-surface)"
            stroke="var(--fr-accent)"
            strokeWidth="2.5"
          />
          <circle
            cx={activeCoordinate.x}
            cy={activeCoordinate.y}
            r="5"
            fill="var(--fr-accent)"
          />
          <line
            x1={activeCoordinate.x - 6}
            y1={adminPerformanceChartHeight - 20}
            x2={activeCoordinate.x + 6}
            y2={adminPerformanceChartHeight - 20}
            stroke="var(--fr-accent)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </>
      )}

      {labelIndexes.map((index) => {
        const point = points[index]
        const x =
          adminPerformanceChartPadding.left +
          (index / Math.max(points.length - 1, 1)) * plotWidth
        const isSelected = index === hoverIndex

        return (
          <text
            key={point.date}
            x={x}
            y={adminPerformanceChartHeight - 10}
            textAnchor="middle"
            fill={isSelected ? 'var(--fr-accent)' : 'var(--fr-text-tertiary)'}
            fontSize="11"
            fontWeight={isSelected ? 700 : 400}
            opacity={hoverIndex === null || isSelected ? 1 : 0.35}
          >
            {formatAdminAxisDate(point)}
          </text>
        )
      })}

      <rect
        x={adminPerformanceChartPadding.left}
        y={adminPerformanceChartPadding.top}
        width={plotWidth}
        height={plotHeight}
        fill="transparent"
        className="[cursor:crosshair]"
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
      />
    </svg>
  )
}
