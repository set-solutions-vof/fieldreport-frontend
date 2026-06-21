import type { ReactNode, PointerEvent, RefObject } from 'react'
import type {
  AdminHomeChartMetric,
  AdminHomeChartPoint,
  AdminHomeDateRange,
  AdminHomeDateRangePreset,
  AdminHomeMetric,
  AdminHomeSummaryStat,
  AdminHomeUserFilterId,
  AdminHomeUserFilterOption,
} from '@/typing/adminHome'

export type AdminDateRangePickerProps = {
  value: AdminHomeDateRange
  preset: AdminHomeDateRangePreset
  onChange: (
    range: AdminHomeDateRange,
    preset: AdminHomeDateRangePreset,
  ) => void
}

export type AdminDateRangeMonthPanelProps = {
  month: Date
  monthLabel: string
  draftRange: AdminHomeDateRange
  pendingStartDate: string | null
  onDaySelect: (isoDate: string) => void
}

export type AdminDateRangePresetListProps = {
  draftPreset: AdminHomeDateRangePreset
  onPresetSelect: (preset: AdminHomeDateRangePreset) => void
}

export type AdminHoverTooltipProps = {
  date?: string
  label: string
  clientX: number
  clientY: number
  preferBelow?: boolean
}

export type AdminMetricCardProps = {
  metric: AdminHomeMetric
}

export type AdminPerformanceChartProps = {
  points: AdminHomeChartPoint[]
  metric: AdminHomeChartMetric
  onMetricChange: (metric: AdminHomeChartMetric) => void
}

export type AdminPerformanceChartPlotProps = {
  points: AdminHomeChartPoint[]
  svgRef: RefObject<SVGSVGElement>
  hoverIndex: number | null
  plotWidth: number
  plotHeight: number
  axisMaxValue: number
  gridTicks: number[]
  pointCoordinates: Array<{
    x: number
    y: number
    point: AdminHomeChartPoint
  }>
  linePoints: string
  showPointMarkers: boolean
  labelIndexes: number[]
  activeCoordinate: {
    x: number
    y: number
    point: AdminHomeChartPoint
  } | null
  onPointerMove: (event: PointerEvent<SVGRectElement>) => void
  onPointerLeave: () => void
}

export type AdminPerformanceOverviewProps = {
  summaryStats: AdminHomeSummaryStat[]
  metrics: AdminHomeMetric[]
  dateRange: AdminHomeDateRange
  dateRangePreset: AdminHomeDateRangePreset
  userFilterId: AdminHomeUserFilterId
  userFilterOptions: AdminHomeUserFilterOption[]
  onDateRangeChange: (
    range: AdminHomeDateRange,
    preset: AdminHomeDateRangePreset,
  ) => void
  onUserFilterChange: (userId: AdminHomeUserFilterId) => void
}

export type AdminSparklineProps = {
  points: AdminHomeChartPoint[]
  valueLabel: string
}

export type AdminStatTileProps = {
  title: string
  value: string
  hint: string
  children?: ReactNode
}

export type AdminTeamUserFilterProps = {
  value: AdminHomeUserFilterId
  options: AdminHomeUserFilterOption[]
  onChange: (userId: AdminHomeUserFilterId) => void
}
