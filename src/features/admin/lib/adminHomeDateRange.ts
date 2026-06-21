import type {
  AdminHomeDateRange,
  AdminHomeDateRangePreset,
} from '@/typing/adminHome'

export function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

export function addDays(date: Date, days: number): Date {
  const nextDate = new Date(date)
  nextDate.setDate(nextDate.getDate() + days)
  return nextDate
}

export function formatIsoDate(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function parseIsoDate(isoDate: string): Date {
  const [year, month, day] = isoDate.split('-').map(Number)
  return startOfDay(new Date(year, month - 1, day))
}

export function buildAdminHomeDateRangePreset(
  preset: AdminHomeDateRangePreset,
  referenceDate = startOfDay(new Date()),
): AdminHomeDateRange {
  if (preset === 'today') {
    return {
      startDate: formatIsoDate(referenceDate),
      endDate: formatIsoDate(referenceDate),
    }
  }

  if (preset === 'yesterday') {
    const yesterday = addDays(referenceDate, -1)
    return {
      startDate: formatIsoDate(yesterday),
      endDate: formatIsoDate(yesterday),
    }
  }

  if (preset === 'last_7_days') {
    return {
      startDate: formatIsoDate(addDays(referenceDate, -6)),
      endDate: formatIsoDate(referenceDate),
    }
  }

  if (preset === 'last_30_days') {
    return {
      startDate: formatIsoDate(addDays(referenceDate, -29)),
      endDate: formatIsoDate(referenceDate),
    }
  }

  if (preset === 'month_to_date') {
    return {
      startDate: formatIsoDate(
        new Date(referenceDate.getFullYear(), referenceDate.getMonth(), 1),
      ),
      endDate: formatIsoDate(referenceDate),
    }
  }

  return buildAdminHomeDateRangePreset('last_30_days', referenceDate)
}

export function formatAdminHomeDateRangeInput(
  range: AdminHomeDateRange,
): string {
  return `${formatAdminHomeDateInput(range.startDate)} → ${formatAdminHomeDateInput(range.endDate)}`
}

function formatAdminHomeDateInput(isoDate: string): string {
  const [year, month, day] = isoDate.split('-')
  return `${year}/${month}/${day}`
}

export function normalizeAdminHomeDateRange(
  startDate: string,
  endDate: string,
): AdminHomeDateRange {
  const start = parseIsoDate(startDate)
  const end = parseIsoDate(endDate)

  if (start <= end) {
    return { startDate, endDate }
  }

  return {
    startDate: endDate,
    endDate: startDate,
  }
}

export function isSameIsoDate(leftDate: string, rightDate: string): boolean {
  return leftDate === rightDate
}

export function isDateWithinRange(
  isoDate: string,
  range: AdminHomeDateRange,
): boolean {
  const date = parseIsoDate(isoDate)
  const rangeStart = parseIsoDate(range.startDate)
  const rangeEnd = parseIsoDate(range.endDate)
  return date >= rangeStart && date <= rangeEnd
}

export function buildMonthGrid(year: number, month: number): Date[] {
  const firstDay = new Date(year, month, 1)
  const startOffset = firstDay.getDay()
  const gridStart = addDays(firstDay, -startOffset)
  return Array.from({ length: 42 }, (_, index) => addDays(gridStart, index))
}
