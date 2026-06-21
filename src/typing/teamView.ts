import type { InviteRole } from '@/typing/onboarding'
import type { TeamUser } from '@/typing/team'
import type { AdminPageProps } from '@/typing/routes'

export type TeamPageProps = AdminPageProps & {
  onOpenTeamInvite: () => void
  onOpenTeamUser: (userId: string) => void
}

export type TeamInvitePageProps = AdminPageProps & {
  onCancel: () => void
}

export type TeamUserDetailPageProps = AdminPageProps & {
  userId: string
  onCancel: () => void
  onDeleted: () => void
}

export type TeamUsersTableProps = {
  users: TeamUser[]
  onOpenUser: (userId: string) => void
}

export type TeamRoleFieldProps = {
  value: InviteRole
  onChange: (role: InviteRole) => void
}

export type UseTeamUsersParameters = {
  onAuthenticationExpired: () => void
}

export type UseTeamUserDetailParameters = {
  userId: string
  onAuthenticationExpired: () => void
  onDeleted: () => void
}
