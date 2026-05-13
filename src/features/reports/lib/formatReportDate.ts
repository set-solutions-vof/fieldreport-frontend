const dutchShortDateFormatter = new Intl.DateTimeFormat('nl-NL', {
  day: 'numeric',
  month: 'short',
})

const dutchShortTimeFormatter = new Intl.DateTimeFormat('nl-NL', {
  hour: '2-digit',
  minute: '2-digit',
})

export function formatDutchShortDate(isoDate: string): string {
  return dutchShortDateFormatter.format(new Date(isoDate))
}

export function formatUpdatedAt(isoDateTime: string | null): string {
  if (isoDateTime === null) {
    return '–'
  }

  const updatedAt = new Date(isoDateTime)
  const time = dutchShortTimeFormatter.format(updatedAt)

  if (isToday(updatedAt)) {
    return `vandaag · ${time}`
  }

  return `${dutchShortDateFormatter.format(updatedAt)} · ${time}`
}

function isToday(date: Date): boolean {
  const today = new Date()

  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  )
}
