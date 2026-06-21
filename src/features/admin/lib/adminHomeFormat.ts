import { getLocale } from '@/lib/translations'

function parseIsoDate(isoDate: string): Date {
  const [year, month, day] = isoDate.split('-').map(Number)
  return new Date(year, month - 1, day)
}

export function formatAdminTooltipDate(isoDate: string): string {
  return new Intl.DateTimeFormat(getLocale() === 'nl' ? 'nl-NL' : 'en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(parseIsoDate(isoDate))
}

export function formatAdminChartPointLabel(point: {
  date: string
  endDate?: string
}): string {
  if (point.endDate !== undefined && point.endDate !== point.date) {
    return `${formatAdminTooltipDate(point.date)} – ${formatAdminTooltipDate(point.endDate)}`
  }

  return formatAdminTooltipDate(point.date)
}

export function formatAdminAxisDate(point: {
  date: string
  endDate?: string
}): string {
  if (point.endDate !== undefined && point.endDate !== point.date) {
    const bucketDays =
      Math.round(
        (parseIsoDate(point.endDate).getTime() -
          parseIsoDate(point.date).getTime()) /
          86_400_000,
      ) + 1

    if (bucketDays > 20) {
      const [year, month] = point.date.split('-')
      return `${month}/${year.slice(2)}`
    }
  }

  const [, month, day] = point.date.split('-')
  return `${month}/${day}`
}
