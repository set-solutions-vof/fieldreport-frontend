import type { ChangeEvent } from 'react'
import { inviteRoleLabel } from '@/lib/inviteRole'
import { translations } from '@/lib/translations'
import type { InviteRole } from '@/typing/onboarding'
import type { TeamRoleFieldProps } from '@/typing/teamView'

const roleOptions: InviteRole[] = ['inspector', 'admin']

export function TeamRoleField({ value, onChange }: TeamRoleFieldProps) {
  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    onChange(event.currentTarget.value as InviteRole)
  }

  return (
    <fieldset className="flex flex-col [gap:var(--fr-space-3)] [margin:var(--fr-space-0)] [padding:var(--fr-space-0)] border-0">
      {roleOptions.map((role) => (
        <label
          key={role}
          className="flex items-start [gap:var(--fr-space-3)] [padding:var(--fr-space-3)] [border:var(--fr-border-width-sm)_solid_var(--fr-border)] [border-radius:var(--fr-radius-md)] cursor-pointer hover:[background:var(--fr-surface-hover)] has-[:checked]:[border-color:var(--fr-accent)] has-[:checked]:[background:var(--fr-surface-sunken)]"
        >
          <input
            type="radio"
            name="team-invite-role"
            className="[margin-top:var(--fr-space-1)] [accent-color:var(--fr-accent)]"
            value={role}
            checked={value === role}
            onChange={handleChange}
          />
          <span className="flex flex-col [gap:var(--fr-space-1)]">
            <span className="[font-size:var(--fr-text-sm)] [font-weight:var(--fr-weight-medium)] [color:var(--fr-text-primary)]">
              {inviteRoleLabel(role)}
            </span>
            <span className="[font-size:var(--fr-text-sm)] [line-height:var(--fr-leading-snug)] [color:var(--fr-text-secondary)]">
              {role === 'inspector'
                ? translations.team.invite_page.roles.inspector_description
                : translations.team.invite_page.roles.admin_description}
            </span>
          </span>
        </label>
      ))}
    </fieldset>
  )
}
