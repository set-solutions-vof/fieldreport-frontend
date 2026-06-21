import type {
  AdminHomeChartBucket,
  AdminHomeChartBucketSize,
  AdminHomeChartMetric,
  AdminHomeDateRange,
} from '@/typing/adminHome'
import type { ReportSummary } from '@/typing/report'
import {
  addDays,
  formatIsoDate,
  parseIsoDate,
  startOfDay,
} from './adminHomeDateRange'

function countDaysInclusive(range: AdminHomeDateRange): number {
  const start = parseIsoDate(range.startDate)
  const end = parseIsoDate(range.endDate)
  return Math.round((end.getTime() - start.getTime()) / 86_400_000) + 1
}

export function resolveAdminHomeChartBucketSize(
  dayCount: number,
): AdminHomeChartBucketSize {
  if (dayCount <= 31) {
    return 'day'
  }

  if (dayCount <= 120) {
    return 'week'
  }

  return 'month'
}

function buildChartBuckets(
  range: AdminHomeDateRange,
  bucketSize: AdminHomeChartBucketSize,
): AdminHomeChartBucket[] {
  const seriesStart = parseIsoDate(range.startDate)
  const seriesEnd = parseIsoDate(range.endDate)

  if (bucketSize === 'day') {
    const buckets: AdminHomeChartBucket[] = []

    for (
      let cursor = new Date(seriesStart);
      cursor <= seriesEnd;
      cursor = addDays(cursor, 1)
    ) {
      const isoDate = formatIsoDate(cursor)
      buckets.push({ startDate: isoDate, endDate: isoDate })
    }

    return buckets
  }

  if (bucketSize === 'week') {
    const buckets: AdminHomeChartBucket[] = []
    let cursor = new Date(seriesStart)

    while (cursor <= seriesEnd) {
      const bucketStart = new Date(cursor)
      const bucketEnd = addDays(cursor, 6)
      buckets.push({
        startDate: formatIsoDate(bucketStart),
        endDate: formatIsoDate(bucketEnd > seriesEnd ? seriesEnd : bucketEnd),
      })
      cursor = addDays(cursor, 7)
    }

    return buckets
  }

  const buckets: AdminHomeChartBucket[] = []
  let year = seriesStart.getFullYear()
  let month = seriesStart.getMonth()

  while (true) {
    const monthStart = startOfDay(new Date(year, month, 1))
    const monthEnd = startOfDay(new Date(year, month + 1, 0))
    const bucketStart = monthStart < seriesStart ? seriesStart : monthStart
    const bucketEnd = monthEnd > seriesEnd ? seriesEnd : monthEnd

    if (bucketStart > seriesEnd) {
      break
    }

    buckets.push({
      startDate: formatIsoDate(bucketStart),
      endDate: formatIsoDate(bucketEnd),
    })

    month += 1
    if (month > 11) {
      month = 0
      year += 1
    }
  }

  return buckets
}

function reportsInBucket(
  reports: ReportSummary[],
  bucket: AdminHomeChartBucket,
  metric: AdminHomeChartMetric,
): number {
  const bucketStart = parseIsoDate(bucket.startDate)
  const bucketEnd = parseIsoDate(bucket.endDate)
  const bucketReports = reports.filter((report) => {
    const inspectionDate = startOfDay(new Date(report.inspection_date))
    return inspectionDate >= bucketStart && inspectionDate <= bucketEnd
  })

  if (metric === 'reports') {
    return bucketReports.length
  }

  if (metric === 'approved') {
    return bucketReports.filter((report) => report.status === 'approved').length
  }

  return bucketReports.filter((report) => report.status === 'draft').length
}

export function buildAdminHomeDailySeries(
  reports: ReportSummary[],
  range: AdminHomeDateRange,
  metric: AdminHomeChartMetric,
) {
  const bucketSize = resolveAdminHomeChartBucketSize(countDaysInclusive(range))
  const buckets = buildChartBuckets(range, bucketSize)

  return buckets.map((bucket) => ({
    date: bucket.startDate,
    endDate: bucket.startDate === bucket.endDate ? undefined : bucket.endDate,
    value: reportsInBucket(reports, bucket, metric),
  }))
}

export function reportsWithinRange(
  reports: ReportSummary[],
  range: AdminHomeDateRange,
): ReportSummary[] {
  const rangeStart = parseIsoDate(range.startDate)
  const rangeEnd = parseIsoDate(range.endDate)

  return reports.filter((report) => {
    const inspectionDate = startOfDay(new Date(report.inspection_date))
    return inspectionDate >= rangeStart && inspectionDate <= rangeEnd
  })
}

export function reportsThisMonth(reports: ReportSummary[]): ReportSummary[] {
  const today = startOfDay(new Date())

  return reports.filter((report) => {
    const inspectionDate = new Date(report.inspection_date)
    return (
      inspectionDate.getMonth() === today.getMonth() &&
      inspectionDate.getFullYear() === today.getFullYear()
    )
  })
}

export function formatApprovalRate(
  approvedCount: number,
  totalCount: number,
): string {
  if (totalCount === 0) {
    return '0%'
  }

  return `${Math.round((approvedCount / totalCount) * 100)}%`
}
