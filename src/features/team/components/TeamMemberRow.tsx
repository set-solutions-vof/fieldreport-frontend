import { getUserInitials } from '@/features/reports/lib/getUserInitials'
import { inviteRoleLabel } from '@/lib/inviteRole'
import type { TeamMemberRowProps } from '@/types/teamView'
import './TeamMemberRow.css'

export function TeamMemberRow({ member }: TeamMemberRowProps) {
  return (
    <div className="fr-team-member-row">
      <span className="fr-team-member-row__avatar">
        {getUserInitials(member.name)}
      </span>
      <div className="fr-team-member-row__identity">
        <strong>{member.name}</strong>
        <span>{member.email}</span>
      </div>
      <span className="fr-team-member-row__role">
        {inviteRoleLabel(member.role)}
      </span>
    </div>
  )
}
