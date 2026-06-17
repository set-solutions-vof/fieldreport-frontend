import { getLocale, translations } from '@/lib/translations'

function getDateLocale(): string {
  return getLocale() === 'nl' ? 'nl-NL' : 'en-GB'
}

function shortDateFormatter(): Intl.DateTimeFormat {
  return new Intl.DateTimeFormat(getDateLocale(), {
    day: 'numeric',
    month: 'short',
  })
}

function shortTimeFormatter(): Intl.DateTimeFormat {
  return new Intl.DateTimeFormat(getDateLocale(), {
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function formatDutchShortDate(isoDate: string): string {
  return shortDateFormatter().format(new Date(isoDate))
}

export function formatUpdatedAt(isoDateTime: string | null): string {
  if (isoDateTime === null) {
    return '–'
  }

  const updatedAt = new Date(isoDateTime)
  const time = shortTimeFormatter().format(updatedAt)

  if (isToday(updatedAt)) {
    return `${translations.report_detail.document.today} · ${time}`
  }

  return `${shortDateFormatter().format(updatedAt)} · ${time}`
}

function isToday(date: Date): boolean {
  const today = new Date()

  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  )
}
