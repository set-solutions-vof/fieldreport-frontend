import type { TeamMember } from '@/types/team'

export type TeamPageProps = {
  onOpenTemplate: () => void
  onOpenTeam: () => void
  onAuthenticationExpired: () => void
}

export type TeamMemberRowProps = {
  member: TeamMember
}

export type UseTeamMembersParameters = {
  onAuthenticationExpired: () => void
}
