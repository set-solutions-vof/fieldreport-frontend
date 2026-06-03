import { useState } from 'react'
import type { ChangeEvent } from 'react'
import { Button, Input } from '@/design-system'
import { translations } from '@/lib/translations'
import type { InviteRole } from '@/types/onboarding'
import type {
  ActiveInviteRowProps,
  InviteRowProps,
} from '@/types/onboardingView'
import { OnboardingIcon } from './icons/OnboardingIcon'
import './InviteRow.css'

export function InviteRow(props: InviteRowProps) {
  if (props.mode === 'confirmed') {
    return (
      <div className="fr-onboarding-invite-row fr-onboarding-invite-row--confirmed">
        <span className="fr-onboarding-invite-row__avatar">
          {inviteInitials(props.invite.email)}
        </span>
        <div className="fr-onboarding-invite-row__identity">
          <strong>{props.invite.email}</strong>
          <span>{roleLabels[props.invite.role]}</span>
        </div>
        <span className="fr-onboarding-invite-row__badge">
          <OnboardingIcon
            name="check"
            className="fr-onboarding-invite-row__badge-icon fr-onboarding-icon"
          />
          {translations.onboarding.invites.invited_badge}
        </span>
        <button
          type="button"
          className="fr-onboarding-invite-row__delete"
          aria-label={translations.onboarding.invites.delete_label.replace(
            '{{email}}',
            props.invite.email,
          )}
          onClick={() => props.onDelete(props.invite.id)}
        >
          <OnboardingIcon
            name="x"
            className="fr-onboarding-invite-row__delete-icon fr-onboarding-icon"
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
    <div className="fr-onboarding-invite-row fr-onboarding-invite-row--active">
      <Input
        type="email"
        label={translations.onboarding.invites.email_label}
        value={email}
        onChange={handleEmailChange}
        disabled={isSending}
        fieldClassName="fr-onboarding-invite-row__email"
      />
      <label className="fr-onboarding-select-field">
        <span>{translations.onboarding.invites.role_label}</span>
        <select
          className="fr-onboarding-select"
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

const roleLabels: Record<InviteRole, string> = {
  admin: translations.onboarding.invites.roles.admin,
  inspector: translations.onboarding.invites.roles.inspector,
}
