const dutchShortDateFormatter = new Intl.DateTimeFormat('nl-NL', {
  day: 'numeric',
  month: 'short',
})

export function formatDutchShortDate(isoDate: string): string {
  return dutchShortDateFormatter.format(new Date(isoDate))
}
