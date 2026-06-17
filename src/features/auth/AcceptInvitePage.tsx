import { Button, Input, Logo, Spinner } from '@set-solutions-vof/design-system'
import { PageHeader } from '@/components/PageHeader'
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
        <div className="flex [max-width:calc(var(--fr-space-16)_+_var(--fr-space-15))] flex-col items-start">
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
          <PageHeader
            title={translations.auth.invite.invalid_title}
            metadata={loadError}
          />
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
      <section
        className="flex flex-col [width:min(100%,_calc(var(--fr-space-16)_+_var(--fr-space-15)))] [gap:var(--fr-space-5)] [padding:var(--fr-space-6)] [background:var(--fr-surface)] [border:var(--fr-border-width-sm)_solid_var(--fr-border)] [border-radius:var(--fr-radius-lg)] [box-shadow:var(--fr-shadow-sm)]"
        aria-labelledby="accept-invite-title"
      >
        <div className="flex">
          <Logo variant="accent" />
        </div>
        <PageHeader
          title={translations.auth.invite.title}
          metadata={translations.auth.invite.subtitle
            .replace('{{company}}', invitePreview.company_name)
            .replace('{{role}}', roleLabel)}
          titleId="accept-invite-title"
        />
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
