import { getUserInitials } from '@/features/reports/lib/getUserInitials'
import { inviteRoleLabel } from '@/lib/inviteRole'
import type { TeamMemberRowProps } from '@/types/teamView'

export function TeamMemberRow({ member }: TeamMemberRowProps) {
  return (
    <div className="grid [grid-template-columns:auto_minmax(var(--fr-space-0),_1fr)_auto] items-center [gap:var(--fr-space-3)] [padding:var(--fr-space-3)] [background:var(--fr-surface)] [border:var(--fr-border-width-sm)_solid_var(--fr-border)] [border-radius:var(--fr-radius-lg)]">
      <span className="inline-flex items-center justify-center [width:var(--fr-space-8)] [height:var(--fr-space-8)] [border-radius:var(--fr-radius-full)] [font-size:var(--fr-text-xs)] [font-weight:var(--fr-weight-bold)] [color:var(--fr-text-on-accent)] [background:var(--fr-accent)]">
        {getUserInitials(member.name)}
      </span>
      <div className="flex [min-width:var(--fr-space-0)] flex-col [gap:var(--fr-space-1)] [&_strong]:overflow-hidden [&_strong]:[color:var(--fr-text-primary)] [&_strong]:text-ellipsis [&_strong]:whitespace-nowrap [&_span]:overflow-hidden [&_span]:[font-size:var(--fr-text-sm)] [&_span]:[color:var(--fr-text-secondary)] [&_span]:text-ellipsis [&_span]:whitespace-nowrap">
        <strong>{member.name}</strong>
        <span>{member.email}</span>
      </div>
      <span className="[font-size:var(--fr-text-sm)] [font-weight:var(--fr-weight-medium)] [color:var(--fr-text-secondary)]">
        {inviteRoleLabel(member.role)}
      </span>
    </div>
  )
}
