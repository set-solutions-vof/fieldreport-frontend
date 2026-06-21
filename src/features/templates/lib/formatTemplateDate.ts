import { formatTeamDate } from '@/features/team/lib/formatTeamDate'

export function formatTemplateDate(isoDate: string): string {
  return formatTeamDate(isoDate)
}
