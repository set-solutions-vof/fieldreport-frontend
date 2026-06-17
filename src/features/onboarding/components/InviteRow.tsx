import { useState } from 'react'
import type { ChangeEvent } from 'react'
import { Button, Input } from '@set-solutions-vof/design-system'
import { inviteRoleLabel } from '@/lib/inviteRole'
import { translations } from '@/lib/translations'
import type { InviteRole } from '@/types/onboarding'
import type {
  ActiveInviteRowProps,
  InviteRowProps,
} from '@/types/onboardingView'
import { OnboardingIcon } from './icons/OnboardingIcon'

export function InviteRow(props: InviteRowProps) {
  if (props.mode === 'confirmed') {
    return (
      <div className="grid [grid-template-columns:auto_minmax(var(--fr-space-0),_1fr)_auto_auto] items-center [gap:var(--fr-space-3)] [padding:var(--fr-space-3)] [background:var(--fr-surface)] [border:var(--fr-border-width-sm)_solid_var(--fr-border)] [border-radius:var(--fr-radius-lg)]">
        <span className="inline-flex items-center justify-center [width:var(--fr-space-8)] [height:var(--fr-space-8)] [border-radius:var(--fr-radius-full)] [font-size:var(--fr-text-xs)] [font-weight:var(--fr-weight-bold)] [color:var(--fr-text-on-accent)] [background:var(--fr-accent)]">
          {inviteInitials(props.invite.email)}
        </span>
        <div className="flex [min-width:var(--fr-space-0)] flex-col [gap:var(--fr-space-1)] [&_strong]:overflow-hidden [&_strong]:[color:var(--fr-text-primary)] [&_strong]:text-ellipsis [&_strong]:whitespace-nowrap [&_span]:[font-size:var(--fr-text-sm)] [&_span]:[color:var(--fr-text-secondary)]">
          <strong>{props.invite.email}</strong>
          <span>{inviteRoleLabel(props.invite.role)}</span>
        </div>
        <span className="inline-flex items-center [gap:var(--fr-space-1)] [padding:var(--fr-space-1)_var(--fr-space-2)] [border-radius:var(--fr-radius-full)] [font-size:var(--fr-text-xs)] [font-weight:var(--fr-weight-semibold)] [color:var(--fr-status-approved-fg)] [background:var(--fr-status-approved-bg)] [border:var(--fr-border-width-sm)_solid_var(--fr-status-approved-border)]">
          <OnboardingIcon
            name="check"
            className="[width:var(--fr-space-3)] [height:var(--fr-space-3)] [stroke-width:2.5] block [width:var(--fr-space-4)] [height:var(--fr-space-4)] shrink-0 [width:var(--fr-space-5)] [height:var(--fr-space-5)]"
          />
          {translations.onboarding.invites.invited_badge}
        </span>
        <button
          type="button"
          className="inline-flex items-center justify-center [width:var(--fr-control-height-md)] [height:var(--fr-control-height-md)] [padding:var(--fr-space-0)] [color:var(--fr-text-tertiary)] cursor-pointer bg-transparent border-0 [border-radius:var(--fr-radius-md)] hover:[color:var(--fr-text-primary)] hover:[background:var(--fr-surface-hover)] hover:outline-none focus-visible:[color:var(--fr-text-primary)] focus-visible:[background:var(--fr-surface-hover)] focus-visible:outline-none"
          aria-label={translations.onboarding.invites.delete_label.replace(
            '{{email}}',
            props.invite.email,
          )}
          onClick={() => props.onDelete(props.invite.id)}
        >
          <OnboardingIcon
            name="x"
            className="[width:var(--fr-space-4)] [height:var(--fr-space-4)] block [width:var(--fr-space-4)] [height:var(--fr-space-4)] shrink-0 [width:var(--fr-space-5)] [height:var(--fr-space-5)]"
          />
        </button>
      </div>
    )
  }

  return <ActiveInviteRow isSending={props.isSending} onSend={props.onSend} />
}

function ActiveInviteRow({ isSending, onSend }: ActiveInviteRowProps) {
  const [email, setEmail] = useState('')
  const [role, setRole] = useState<InviteRole>('inspector')
  const canSend = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  function handleEmailChange(event: ChangeEvent<HTMLInputElement>): void {
    setEmail(event.currentTarget.value)
  }

  function handleRoleChange(event: ChangeEvent<HTMLSelectElement>): void {
    setRole(event.currentTarget.value as InviteRole)
  }

  async function handleSend(): Promise<void> {
    await onSend(email, role)
    setEmail('')
    setRole('inspector')
  }

  return (
    <div className="grid [grid-template-columns:auto_minmax(var(--fr-space-0),_1fr)_auto_auto] items-center [gap:var(--fr-space-3)] [padding:var(--fr-space-3)] [background:var(--fr-surface)] [border:var(--fr-border-width-sm)_solid_var(--fr-border)] [border-radius:var(--fr-radius-lg)] [grid-template-columns:minmax(var(--fr-space-0),_1fr)_var(--fr-space-15)_auto] items-end">
      <Input
        type="email"
        label={translations.onboarding.invites.email_label}
        value={email}
        onChange={handleEmailChange}
        disabled={isSending}
        fieldClassName="[min-width:var(--fr-space-0)]"
      />
      <label className="flex flex-col [gap:var(--fr-space-2)] [font-size:var(--fr-text-sm)] [font-weight:var(--fr-weight-medium)] [color:var(--fr-text-primary)]">
        <span>{translations.onboarding.invites.role_label}</span>
        <select
          className="[height:var(--fr-control-height-md)] [padding:var(--fr-space-0)_var(--fr-space-3)] [font:inherit] [color:var(--fr-text-primary)] [background:var(--fr-surface)] [border:var(--fr-border-width-sm)_solid_var(--fr-border-strong)] [border-radius:var(--fr-radius-md)] focus:[border-color:var(--fr-border-focus)] focus:outline-none focus:[box-shadow:var(--fr-shadow-focus)]"
          value={role}
          disabled={isSending}
          onChange={handleRoleChange}
        >
          <option value="inspector">
            {translations.onboarding.invites.roles.inspector}
          </option>
          <option value="admin">
            {translations.onboarding.invites.roles.admin}
          </option>
        </select>
      </label>
      <Button
        type="button"
        variant="secondary"
        disabled={!canSend}
        loading={isSending}
        onClick={() => void handleSend()}
      >
        {translations.onboarding.invites.send_button}
      </Button>
    </div>
  )
}

function inviteInitials(email: string): string {
  return email.slice(0, 2).toUpperCase()
}
