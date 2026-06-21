import type { InviteRole } from '@/typing/onboarding'

export type TeamUserStatus = 'active' | 'invited'

export type TeamUser = {
  id: string
  first_name: string
  last_name: string
  email: string
  role: InviteRole
  status: TeamUserStatus
  created_at: string
  last_sign_in_at: string | null
}

export type CreateTeamUserPayload = {
  first_name: string
  last_name: string
  email: string
  role: InviteRole
}

export type UpdateTeamUserPayload = {
  first_name: string
  last_name: string
  role: InviteRole
}

export function teamUserDisplayName(
  user: Pick<TeamUser, 'first_name' | 'last_name'>,
): string {
  return `${user.first_name} ${user.last_name}`.trim()
}
