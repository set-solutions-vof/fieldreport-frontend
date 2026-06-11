import type { TeamMember } from '@/types/team'

export type TeamPageProps = {
  onOpenTemplate: () => void
  onOpenTeam: () => void
  onOpenProfile: () => void
  onAuthenticationExpired: () => void
  onLogout: () => void
}

export type TeamMemberRowProps = {
  member: TeamMember
}

export type UseTeamMembersParameters = {
  onAuthenticationExpired: () => void
}
