import { authenticatedFetch } from '@/lib/api/authenticatedFetch'
import { apiBaseUrl } from '@/lib/config'
import type { TeamMember } from '@/typing/team'

const teamEndpoint = `${apiBaseUrl}/api/v1/team`

export async function listTeamMembers(): Promise<TeamMember[]> {
  const response = await authenticatedFetch(`${teamEndpoint}/members`)
  return (await response.json()) as TeamMember[]
}
