import type { TeamMember } from '@/typing/team'
import type { AdminPageProps } from '@/typing/routes'

export type TeamPageProps = AdminPageProps

export type TeamMemberRowProps = {
  member: TeamMember
}

export type UseTeamMembersParameters = {
  onAuthenticationExpired: () => void
}
