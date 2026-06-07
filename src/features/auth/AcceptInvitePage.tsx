import { Button, Input, Logo, Spinner } from '@/design-system'
import { translations } from '@/lib/translations'
import type { AcceptInvitePageProps } from '@/types/authView'
import { useAcceptInviteForm } from './useAcceptInviteForm'
import './LoginPage.css'

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
      <main className="fr-login-page">
        <div className="fr-dashboard-state">
          <Spinner size="lg" />
        </div>
      </main>
    )
  }

  if (loadError !== null || invitePreview === null) {
    return (
      <main className="fr-login-page">
        <section className="fr-login-panel">
          <div className="fr-login-brand">
            <Logo variant="accent" />
          </div>
          <div className="fr-login-copy">
            <h1 className="fr-login-title">
              {translations.auth.invite.invalid_title}
            </h1>
            <p className="fr-login-subtitle">{loadError}</p>
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
    <main className="fr-login-page">
      <section className="fr-login-panel" aria-labelledby="accept-invite-title">
        <div className="fr-login-brand">
          <Logo variant="accent" />
        </div>
        <div className="fr-login-copy">
          <h1 className="fr-login-title" id="accept-invite-title">
            {translations.auth.invite.title}
          </h1>
          <p className="fr-login-subtitle">
            {translations.auth.invite.subtitle
              .replace('{{company}}', invitePreview.company_name)
              .replace('{{role}}', roleLabel)}
          </p>
        </div>
        <form
          className="fr-login-form"
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
