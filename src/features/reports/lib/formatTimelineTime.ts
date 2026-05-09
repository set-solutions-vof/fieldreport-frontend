import type { SectionSource } from '@/types/report'
import { formatSeconds } from './formatSeconds'

const dutchTimeFormatter = new Intl.DateTimeFormat('nl-NL', {
  hour: '2-digit',
  minute: '2-digit',
})

export function formatTimelineTime(source: SectionSource): string {
  if (source.type === 'audio') {
    return formatSeconds(source.timestamp_start!)
  }

  return dutchTimeFormatter.format(new Date(source.capture_time!))
}
