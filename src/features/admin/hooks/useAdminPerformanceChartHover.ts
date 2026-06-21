import {
  useMemo,
  useRef,
  useState,
  type PointerEvent,
  type RefObject,
} from 'react'
import type { AdminHomeChartPoint } from '@/typing/adminHome'
import {
  pointerIndexInSvgPlot,
  svgPointToScreenPx,
} from '../lib/adminChartHover'
import { yAxisTicks } from '../lib/adminPerformanceChartLayout'
import {
  adminPerformanceChartAxisLabelIndexes,
  adminPerformanceChartPadding,
  adminPerformanceChartPlotDimensions,
} from '../lib/adminPerformanceChartLayout'

type ChartPointCoordinate = {
  x: number
  y: number
  point: AdminHomeChartPoint
}

export function useAdminPerformanceChartHover(points: AdminHomeChartPoint[]) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [hoverIndex, setHoverIndex] = useState<number | null>(null)
  const [tooltipAnchor, setTooltipAnchor] = useState<{
    clientX: number
    clientY: number
  } | null>(null)

  const { plotWidth, plotHeight } = adminPerformanceChartPlotDimensions()
  const rawMaxValue = Math.max(...points.map((point) => point.value), 1)
  const axisMaxValue = Math.max(Math.ceil(rawMaxValue), 1)
  const gridTicks = yAxisTicks(rawMaxValue)

  const pointCoordinates = useMemo(
    () =>
      points.map((point, index): ChartPointCoordinate => {
        const x =
          adminPerformanceChartPadding.left +
          (index / Math.max(points.length - 1, 1)) * plotWidth
        const y =
          adminPerformanceChartPadding.top +
          plotHeight -
          (point.value / axisMaxValue) * plotHeight

        return { x, y, point }
      }),
    [axisMaxValue, plotHeight, plotWidth, points],
  )

  const linePoints = pointCoordinates.map(({ x, y }) => `${x},${y}`).join(' ')
  const showPointMarkers = points.length <= 14
  const labelIndexes = adminPerformanceChartAxisLabelIndexes(points.length)
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
      adminPerformanceChartPadding.left,
      plotWidth,
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

  return {
    svgRef: svgRef as RefObject<SVGSVGElement>,
    hoverIndex,
    tooltipAnchor,
    plotWidth,
    plotHeight,
    axisMaxValue,
    gridTicks,
    pointCoordinates,
    linePoints,
    showPointMarkers,
    labelIndexes,
    activePoint,
    activeCoordinate,
    handlePointerMove,
    handlePointerLeave,
  }
}
