import { useState } from 'react'
import type { FormEvent } from 'react'
import { Button, Card, Input } from '@set-solutions-vof/design-system'
import { pageTitleClassName } from '@/components/pageTitleClassName'
import { createTeamUser } from '@/lib/api/team'
import { AuthenticationExpiredError } from '@/lib/api/authenticatedFetch'
import { translations } from '@/lib/translations'
import type { InviteRole } from '@/typing/onboarding'
import type { TeamInvitePageProps } from '@/typing/teamView'
import { TeamRoleField } from '../components/TeamRoleField'

export function TeamInvitePage({
  onAuthenticationExpired,
  onCancel,
}: TeamInvitePageProps) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState<InviteRole>('inspector')
  const [isSending, setIsSending] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const canSubmit =
    firstName.trim() !== '' &&
    lastName.trim() !== '' &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault()

    if (!canSubmit) {
      return
    }

    setIsSending(true)
    setErrorMessage(null)

    try {
      await createTeamUser({
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        email,
        role,
      })
      onCancel()
    } catch (error) {
      if (error instanceof AuthenticationExpiredError) {
        onAuthenticationExpired()
        return
      }

      setErrorMessage(translations.onboarding.invites.send_failed)
    } finally {
      setIsSending(false)
    }
  }

  return (
    <main className="grid [min-height:calc(100dvh_-_var(--fr-space-10))] [grid-template-rows:minmax(var(--fr-space-0),_1fr)_auto] [background:var(--fr-background)]">
      <div className="overflow-y-auto [padding:var(--fr-space-5)]">
        <h1
          className={`${pageTitleClassName} [margin-bottom:var(--fr-space-6)]`}
        >
          {translations.team.invite_page.title}
        </h1>

        <form
          id="team-invite-form"
          className="flex [width:min(100%,calc(var(--fr-space-16)_*_3))] flex-col [gap:var(--fr-space-5)]"
          noValidate
          onSubmit={(event) => void handleSubmit(event)}
        >
          <Card padding="lg">
            <h2 className="[margin:var(--fr-space-0)_var(--fr-space-0)_var(--fr-space-4)] [font-size:var(--fr-text-base)] [font-weight:var(--fr-weight-semibold)] [color:var(--fr-text-primary)]">
              {translations.team.invite_page.details_title}
            </h2>
            <div className="grid [grid-template-columns:repeat(2,_minmax(var(--fr-space-0),_1fr))] [gap:var(--fr-space-4)]">
              <Input
                label={translations.team.user_detail.first_name_label}
                placeholder={
                  translations.team.invite_page.first_name_placeholder
                }
                value={firstName}
                onChange={(event) => setFirstName(event.currentTarget.value)}
                disabled={isSending}
              />
              <Input
                label={translations.team.user_detail.last_name_label}
                placeholder={
                  translations.team.invite_page.last_name_placeholder
                }
                value={lastName}
                onChange={(event) => setLastName(event.currentTarget.value)}
                disabled={isSending}
              />
              <Input
                type="email"
                fieldClassName="[grid-column:1_/_-1] [max-width:calc(var(--fr-space-16)_+_var(--fr-space-12))]"
                label={translations.onboarding.invites.email_label}
                placeholder={translations.team.invite_page.email_placeholder}
                value={email}
                onChange={(event) => setEmail(event.currentTarget.value)}
                disabled={isSending}
              />
            </div>
          </Card>

          <Card padding="lg">
            <h2 className="[margin:var(--fr-space-0)_var(--fr-space-0)_var(--fr-space-2)] [font-size:var(--fr-text-base)] [font-weight:var(--fr-weight-semibold)] [color:var(--fr-text-primary)]">
              {translations.team.invite_page.role_title}
            </h2>
            <p className="[margin:var(--fr-space-0)_var(--fr-space-0)_var(--fr-space-4)] [font-size:var(--fr-text-sm)] [line-height:var(--fr-leading-snug)] [color:var(--fr-text-secondary)]">
              {translations.team.invite_page.role_description}
            </p>
            <TeamRoleField value={role} onChange={setRole} />
          </Card>

          {errorMessage !== null && (
            <p
              className="[margin:var(--fr-space-0)] [font-size:var(--fr-text-sm)] [color:var(--fr-destructive)]"
              role="alert"
            >
              {errorMessage}
            </p>
          )}
        </form>
      </div>

      <footer className="sticky [bottom:var(--fr-space-0)] flex shrink-0 justify-end [gap:var(--fr-space-3)] [padding:var(--fr-space-4)_var(--fr-space-5)] [background:var(--fr-surface)] [border-top:var(--fr-border-width-sm)_solid_var(--fr-border)]">
        <Button
          type="button"
          variant="ghost"
          disabled={isSending}
          onClick={onCancel}
        >
          {translations.team.invite_page.cancel_button}
        </Button>
        <Button
          type="submit"
          form="team-invite-form"
          variant="primary"
          disabled={!canSubmit}
          loading={isSending}
        >
          {translations.team.invite_page.submit_button}
        </Button>
      </footer>
    </main>
  )
}
