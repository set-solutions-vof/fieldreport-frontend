import { getLocale } from '@/lib/translations'

export function formatTeamDate(isoDate: string): string {
  return new Intl.DateTimeFormat(getLocale() === 'nl' ? 'nl-NL' : 'en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(isoDate))
}

export function formatTeamDateTime(isoDate: string): string {
  return new Intl.DateTimeFormat(getLocale() === 'nl' ? 'nl-NL' : 'en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(isoDate))
}
