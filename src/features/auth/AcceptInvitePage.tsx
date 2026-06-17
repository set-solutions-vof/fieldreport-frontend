import { Button, Input, Logo, Spinner } from '@set-solutions-vof/design-system'
import { translations } from '@/lib/translations'
import type { AcceptInvitePageProps } from '@/types/authView'
import { useAcceptInviteForm } from './useAcceptInviteForm'

export function AcceptInvitePage({
  token,
  onLoginSuccess,
}: AcceptInvitePageProps) {
  const {
    invitePreview,
    isLoading,
    loadError,
    name,
    password,
    isSubmitting,
    submitError,
    handleNameChange,
    handlePasswordChange,
    handleSubmit,
  } = useAcceptInviteForm({ token, onLoginSuccess })

  if (isLoading) {
    return (
      <main className="flex items-center justify-center min-h-[100dvh] box-border [padding:var(--fr-space-6)] [background:var(--fr-background)]">
        <div className="[&_h1]:[margin:var(--fr-space-0)] [&_h1]:[font-size:var(--fr-text-xl)] [&_h1]:[font-weight:var(--fr-weight-semibold)] [&_h1]:[line-height:var(--fr-leading-snug)] [&_h1]:[color:var(--fr-text-primary)] flex [max-width:calc(var(--fr-space-16)_+_var(--fr-space-15))] flex-col items-start [gap:var(--fr-space-4)] [&_p]:[margin:var(--fr-space-0)] [&_p]:[font-size:var(--fr-text-base)] [&_p]:[line-height:var(--fr-leading-normal)] [&_p]:[color:var(--fr-text-secondary)]">
          <Spinner size="lg" />
        </div>
      </main>
    )
  }

  if (loadError !== null || invitePreview === null) {
    return (
      <main className="flex items-center justify-center min-h-[100dvh] box-border [padding:var(--fr-space-6)] [background:var(--fr-background)]">
        <section className="flex flex-col [width:min(100%,_calc(var(--fr-space-16)_+_var(--fr-space-15)))] [gap:var(--fr-space-5)] [padding:var(--fr-space-6)] [background:var(--fr-surface)] [border:var(--fr-border-width-sm)_solid_var(--fr-border)] [border-radius:var(--fr-radius-lg)] [box-shadow:var(--fr-shadow-sm)]">
          <div className="flex">
            <Logo variant="accent" />
          </div>
          <div className="flex flex-col [gap:var(--fr-space-2)]">
            <h1 className="[margin:var(--fr-space-0)] [font-size:var(--fr-text-xl)] [font-weight:var(--fr-weight-semibold)] [line-height:var(--fr-leading-snug)] [color:var(--fr-text-primary)]">
              {translations.auth.invite.invalid_title}
            </h1>
            <p className="[margin:var(--fr-space-0)] [font-size:var(--fr-text-base)] [line-height:var(--fr-leading-normal)] [color:var(--fr-text-secondary)]">{loadError}</p>
          </div>
        </section>
      </main>
    )
  }

  const roleLabel =
    invitePreview.role === 'admin'
      ? translations.onboarding.invites.roles.admin
      : translations.onboarding.invites.roles.inspector

  return (
    <main className="flex items-center justify-center min-h-[100dvh] box-border [padding:var(--fr-space-6)] [background:var(--fr-background)]">
      <section className="flex flex-col [width:min(100%,_calc(var(--fr-space-16)_+_var(--fr-space-15)))] [gap:var(--fr-space-5)] [padding:var(--fr-space-6)] [background:var(--fr-surface)] [border:var(--fr-border-width-sm)_solid_var(--fr-border)] [border-radius:var(--fr-radius-lg)] [box-shadow:var(--fr-shadow-sm)]" aria-labelledby="accept-invite-title">
        <div className="flex">
          <Logo variant="accent" />
        </div>
        <div className="flex flex-col [gap:var(--fr-space-2)]">
          <h1 className="[margin:var(--fr-space-0)] [font-size:var(--fr-text-xl)] [font-weight:var(--fr-weight-semibold)] [line-height:var(--fr-leading-snug)] [color:var(--fr-text-primary)]" id="accept-invite-title">
            {translations.auth.invite.title}
          </h1>
          <p className="[margin:var(--fr-space-0)] [font-size:var(--fr-text-base)] [line-height:var(--fr-leading-normal)] [color:var(--fr-text-secondary)]">
            {translations.auth.invite.subtitle
              .replace('{{company}}', invitePreview.company_name)
              .replace('{{role}}', roleLabel)}
          </p>
        </div>
        <form
          className="flex flex-col [gap:var(--fr-space-4)]"
          onSubmit={(event) => void handleSubmit(event)}
        >
          <Input
            label={translations.auth.invite.email_label}
            type="email"
            value={invitePreview.email}
            disabled
          />
          <Input
            label={translations.auth.invite.name_label}
            type="text"
            autoComplete="name"
            value={name}
            onChange={handleNameChange}
            disabled={isSubmitting}
            required
          />
          <Input
            label={translations.auth.invite.password_label}
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={handlePasswordChange}
            disabled={isSubmitting}
            error={submitError}
            required
          />
          <Button type="submit" variant="primary" loading={isSubmitting}>
            {translations.auth.invite.submit_button}
          </Button>
        </form>
      </section>
    </main>
  )
}
