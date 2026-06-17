import { useState } from 'react'
import type { FormEvent } from 'react'
import { AppShell } from '@/app/AppShell'
import { Button, Divider, Input, Spinner } from '@set-solutions-vof/design-system'
import { useCurrentUser } from '@/features/auth/useCurrentUser'
import { getUserInitials } from '@/features/reports/lib/getUserInitials'
import {
  ApiError,
  AuthenticationExpiredError,
} from '@/lib/api/authenticatedFetch'
import { changePassword, updateProfile } from '@/lib/api/user'
import { translations } from '@/lib/translations'
import type { CurrentUser } from '@/types/auth'

type AccountProfilePageProps = {
  onAuthenticationExpired: () => void
  onCancel: () => void
  onOpenDashboard?: () => void
  onOpenReports?: () => void
  onOpenTemplate?: () => void
  onOpenTeam?: () => void
  onOpenProfile: () => void
  onLogout: () => void
}

export function AccountProfilePage({
  onAuthenticationExpired,
  ...pageProps
}: AccountProfilePageProps) {
  const { currentUser, isLoading, isError, errorMessage, retry } =
    useCurrentUser({
      onAuthenticationExpired,
    })

  if (isLoading || currentUser === null) {
    return (
      <main className="flex min-h-[100dvh] box-border [padding:var(--fr-space-7)] [background:var(--fr-background)]">
        <div className="[&_h1]:[margin:var(--fr-space-0)] [&_h1]:[font-size:var(--fr-text-xl)] [&_h1]:[font-weight:var(--fr-weight-semibold)] [&_h1]:[line-height:var(--fr-leading-snug)] [&_h1]:[color:var(--fr-text-primary)] flex [max-width:calc(var(--fr-space-16)_+_var(--fr-space-15))] flex-col items-start [gap:var(--fr-space-4)] [&_p]:[margin:var(--fr-space-0)] [&_p]:[font-size:var(--fr-text-base)] [&_p]:[line-height:var(--fr-leading-normal)] [&_p]:[color:var(--fr-text-secondary)]">
          <Spinner size="lg" />
        </div>
      </main>
    )
  }

  if (isError) {
    return (
      <main className="flex min-h-[100dvh] box-border [padding:var(--fr-space-7)] [background:var(--fr-background)]">
        <div className="[&_h1]:[margin:var(--fr-space-0)] [&_h1]:[font-size:var(--fr-text-xl)] [&_h1]:[font-weight:var(--fr-weight-semibold)] [&_h1]:[line-height:var(--fr-leading-snug)] [&_h1]:[color:var(--fr-text-primary)] flex [max-width:calc(var(--fr-space-16)_+_var(--fr-space-15))] flex-col items-start [gap:var(--fr-space-4)] [&_p]:[margin:var(--fr-space-0)] [&_p]:[font-size:var(--fr-text-base)] [&_p]:[line-height:var(--fr-leading-normal)] [&_p]:[color:var(--fr-text-secondary)]">
          <h1>{translations.dashboard.states.reports_load_failed_title}</h1>
          <p>{errorMessage}</p>
          <Button type="button" variant="primary" onClick={retry}>
            {translations.dashboard.states.retry_button}
          </Button>
        </div>
      </main>
    )
  }

  return (
    <AccountProfileContent
      key={currentUser.id}
      currentUser={currentUser}
      onAuthenticationExpired={onAuthenticationExpired}
      {...pageProps}
    />
  )
}

function AccountProfileContent({
  currentUser,
  onAuthenticationExpired,
  onCancel,
  onOpenDashboard,
  onOpenReports,
  onOpenTemplate,
  onOpenTeam,
  onOpenProfile,
  onLogout,
}: AccountProfilePageProps & { currentUser: CurrentUser }) {
  const [profileUser, setProfileUser] = useState(currentUser)
  const [name, setName] = useState(currentUser.name)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmedNewPassword, setConfirmedNewPassword] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [currentPasswordError, setCurrentPasswordError] = useState<
    string | null
  >(null)
  const [newPasswordError, setNewPasswordError] = useState<string | null>(null)
  const [confirmPasswordError, setConfirmPasswordError] = useState<
    string | null
  >(null)
  const [formError, setFormError] = useState<string | null>(null)
  const [showSuccessToast, setShowSuccessToast] = useState(false)

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault()
    setCurrentPasswordError(null)
    setNewPasswordError(null)
    setConfirmPasswordError(null)
    setFormError(null)
    setShowSuccessToast(false)
    setIsSaving(true)

    const trimmedName = name.trim()

    if (!trimmedName) {
      setFormError('Naam is verplicht')
      setIsSaving(false)
      return
    }

    const wantsPasswordChange =
      newPassword !== '' || confirmedNewPassword !== ''

    const passwordValidationError = wantsPasswordChange
      ? validatePasswordChange(
          currentPassword,
          newPassword,
          confirmedNewPassword,
        )
      : null

    if (passwordValidationError !== null) {
      if (passwordValidationError.field === 'current') {
        setCurrentPasswordError(passwordValidationError.message)
      }
      if (passwordValidationError.field === 'new') {
        setNewPasswordError(passwordValidationError.message)
      }
      if (passwordValidationError.field === 'confirm') {
        setConfirmPasswordError(passwordValidationError.message)
      }
      setIsSaving(false)
      return
    }

    const shouldChangePassword = wantsPasswordChange

    try {
      const updatedUser = await updateProfile({ name: trimmedName })
      setProfileUser(updatedUser)

      if (shouldChangePassword) {
        await changePassword({
          current_password: currentPassword,
          new_password: newPassword,
        })
        setCurrentPassword('')
        setNewPassword('')
        setConfirmedNewPassword('')
      }

      setShowSuccessToast(true)
    } catch (error) {
      if (error instanceof AuthenticationExpiredError) {
        onAuthenticationExpired()
        return
      }

      if (error instanceof ApiError && error.status === 422) {
        if (error.message === 'current_password_incorrect') {
          setCurrentPasswordError('Huidig wachtwoord is onjuist')
          return
        }

        if (error.message === 'password_too_short') {
          setNewPasswordError('Nieuw wachtwoord moet minimaal 8 tekens zijn')
          return
        }
      }

      setFormError('Profiel kon niet worden opgeslagen')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <AppShell
      currentUser={profileUser}
      activeNavigationItem="profile"
      breadcrumbItems={[{ label: translations.dashboard.navigation.profile }]}
      onOpenDashboard={onOpenDashboard}
      onOpenReports={onOpenReports}
      onOpenTemplate={onOpenTemplate}
      onOpenTeam={onOpenTeam}
      onOpenProfile={onOpenProfile}
      onLogout={onLogout}
    >
      <main className="relative flex flex-col [gap:var(--fr-space-5)]">
        {showSuccessToast && (
          <div className="fixed [top:var(--fr-space-5)] [right:var(--fr-space-5)] [z-index:2] [padding:var(--fr-space-3)_var(--fr-space-4)] [color:var(--fr-status-approved-fg)] [background:var(--fr-status-approved-bg)] [border:var(--fr-border-width-sm)_solid_var(--fr-status-approved-border)] [border-radius:var(--fr-radius-lg)] [font-size:var(--fr-text-sm)] [font-weight:var(--fr-weight-medium)]" role="status">
            Profiel opgeslagen
          </div>
        )}
        <header className="[&_h1]:[margin:var(--fr-space-0)] [&_h1]:[font-size:var(--fr-text-xl)] [&_h1]:[font-weight:var(--fr-weight-semibold)] [&_h1]:[line-height:var(--fr-leading-snug)] [&_h1]:[color:var(--fr-text-primary)]">
          <h1>Account profiel</h1>
        </header>
        <form
          className="flex [width:min(100%,_calc(var(--fr-space-16)_*_3))] flex-col [gap:var(--fr-space-5)] [padding:var(--fr-space-5)] [background:var(--fr-surface)] [border:var(--fr-border-width-sm)_solid_var(--fr-border)] [border-radius:var(--fr-radius-lg)]"
          noValidate
          onSubmit={(event) => void handleSubmit(event)}
        >
          <section className="grid [grid-template-columns:var(--fr-space-10)_minmax(var(--fr-space-0),_1fr)] [gap:var(--fr-space-5)] items-start">
            <span className="inline-flex [width:var(--fr-space-10)] [height:var(--fr-space-10)] items-center justify-center [border-radius:var(--fr-radius-full)] [color:var(--fr-text-on-accent)] [background:var(--fr-accent)] [font-size:var(--fr-text-xl)] [font-weight:var(--fr-weight-semibold)]">
              {getUserInitials(profileUser.name)}
            </span>
            <div className="grid [grid-template-columns:repeat(2,_minmax(var(--fr-space-0),_1fr))] [gap:var(--fr-space-4)]">
              <Input
                fieldClassName="[grid-column:1_/_-1]"
                label="Naam"
                value={name}
                onChange={(event) => setName(event.currentTarget.value)}
              />
              <Input
                className="[color:var(--fr-text-disabled)] cursor-not-allowed [background:var(--fr-surface-sunken)]"
                fieldClassName="[grid-column:1_/_-1]"
                label="E-mailadres"
                value={profileUser.email}
                readOnly
              />
            </div>
          </section>

          <Divider spacing="lg" />

          <section className="flex flex-col [gap:var(--fr-space-4)] [&_h2]:[margin:var(--fr-space-0)] [&_h2]:[font-size:var(--fr-text-md)] [&_h2]:[font-weight:var(--fr-weight-semibold)] [&_h2]:[line-height:var(--fr-leading-snug)] [&_h2]:[color:var(--fr-text-primary)]">
            <h2>Wachtwoord wijzigen</h2>
            <div className="grid [grid-template-columns:repeat(2,_minmax(var(--fr-space-0),_1fr))] [gap:var(--fr-space-4)]">
              <Input
                label="Huidig wachtwoord"
                type="password"
                autoComplete="current-password"
                value={currentPassword}
                error={currentPasswordError}
                onChange={(event) =>
                  setCurrentPassword(event.currentTarget.value)
                }
              />
              <Input
                label="Nieuw wachtwoord"
                type="password"
                autoComplete="new-password"
                value={newPassword}
                error={newPasswordError}
                onChange={(event) => setNewPassword(event.currentTarget.value)}
              />
              <Input
                label="Bevestig nieuw wachtwoord"
                type="password"
                autoComplete="new-password"
                value={confirmedNewPassword}
                error={confirmPasswordError}
                onChange={(event) =>
                  setConfirmedNewPassword(event.currentTarget.value)
                }
              />
            </div>
          </section>

          {formError !== null && (
            <p className="[margin:var(--fr-space-0)] [font-size:var(--fr-text-sm)] [color:var(--fr-destructive)]" role="alert">
              {formError}
            </p>
          )}

          <footer className="flex justify-end [gap:var(--fr-space-2)]">
            <Button
              type="button"
              variant="ghost"
              disabled={isSaving}
              onClick={onCancel}
            >
              Annuleren
            </Button>
            <Button type="submit" variant="primary" loading={isSaving}>
              Opslaan
            </Button>
          </footer>
        </form>
      </main>
    </AppShell>
  )
}

type PasswordField = 'current' | 'new' | 'confirm'

type PasswordValidationError = {
  field: PasswordField
  message: string
}

function validatePasswordChange(
  currentPassword: string,
  newPassword: string,
  confirmedNewPassword: string,
): PasswordValidationError | null {
  if (currentPassword === '') {
    return {
      field: 'current',
      message: 'Huidig wachtwoord is verplicht',
    }
  }

  if (newPassword === '') {
    return {
      field: 'new',
      message: 'Nieuw wachtwoord is verplicht',
    }
  }

  if (confirmedNewPassword === '') {
    return {
      field: 'confirm',
      message: 'Bevestig je nieuwe wachtwoord',
    }
  }

  if (newPassword.length < 8) {
    return {
      field: 'new',
      message: 'Nieuw wachtwoord moet minimaal 8 tekens zijn',
    }
  }

  if (newPassword !== confirmedNewPassword) {
    return {
      field: 'confirm',
      message: 'Wachtwoorden komen niet overeen',
    }
  }

  return null
}
