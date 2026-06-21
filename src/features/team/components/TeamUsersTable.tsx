import { Badge } from '@set-solutions-vof/design-system'
import { inviteRoleLabel } from '@/lib/inviteRole'
import { translations } from '@/lib/translations'
import { teamUserDisplayName, type TeamUser } from '@/typing/team'
import type { TeamUsersTableProps } from '@/typing/teamView'
import { formatTeamDateTime } from '../lib/formatTeamDate'
import { teamTableClassName } from './teamTableStyles'

export function TeamUsersTable({ users, onOpenUser }: TeamUsersTableProps) {
  if (users.length === 0) {
    return (
      <p className="[margin:var(--fr-space-0)] [padding:var(--fr-space-5)] [font-size:var(--fr-text-sm)] [color:var(--fr-text-secondary)]">
        {translations.team.empty}
      </p>
    )
  }

  return (
    <table className={teamTableClassName}>
      <thead>
        <tr>
          <th>{translations.team.table.name}</th>
          <th>{translations.team.table.email}</th>
          <th>{translations.team.table.status}</th>
          <th>{translations.team.table.last_sign_in}</th>
          <th>{translations.team.table.role}</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <TeamUserRow key={user.id} user={user} onOpenUser={onOpenUser} />
        ))}
      </tbody>
    </table>
  )
}

function TeamUserRow({
  user,
  onOpenUser,
}: {
  user: TeamUser
  onOpenUser: (userId: string) => void
}) {
  const displayName = teamUserDisplayName(user)
  const isInvited = user.status === 'invited'

  return (
    <tr className="hover:[background:var(--fr-surface-hover)]">
      <td>
        <button
          type="button"
          className="[padding:var(--fr-space-0)] [font-weight:var(--fr-weight-medium)] [color:var(--fr-accent)] [background:transparent] border-0 cursor-pointer hover:underline"
          onClick={() => onOpenUser(user.id)}
        >
          {displayName}
        </button>
      </td>
      <td>{user.email}</td>
      <td>
        <Badge variant={isInvited ? 'draft' : 'approved'}>
          {isInvited
            ? translations.team.status.invited
            : translations.team.status.active}
        </Badge>
      </td>
      <td className="[color:var(--fr-text-secondary)]">
        {user.last_sign_in_at === null
          ? translations.team.never_signed_in
          : formatTeamDateTime(user.last_sign_in_at)}
      </td>
      <td>{inviteRoleLabel(user.role)}</td>
    </tr>
  )
}
